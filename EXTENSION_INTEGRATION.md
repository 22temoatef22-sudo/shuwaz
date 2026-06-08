# Shuwaz — Extension Integration Guide (CEP for Premiere Pro & After Effects)

دليل ربط إضافة CEP بحسابات موقع شُوَاظ وخصم الدقائق تلقائياً.
لا يوجد backend مخصّص — كل النداءات مباشرة على Supabase REST/Auth API.

---

## 1) ثوابت الاتصال (آمنة للتضمين داخل الإضافة)

```js
const SUPABASE_URL = "https://xkrvgnwawzzbegnyaycu.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrcnZnbndhd3p6YmVnbnlheWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzkzMDQsImV4cCI6MjA5Mzc1NTMwNH0.0PrTwEtD1_sE_ocRhmkCQFvnUzkc2fovk825R9RwCHQ";
```

> الـ `ANON_KEY` مفتاح عام محمي بـ Row Level Security. لا يمنح أي صلاحيات بدون جلسة مستخدم.

كل الطلبات تحتاج رأس:
```
apikey: <ANON_KEY>
Content-Type: application/json
```
وطلبات البيانات/الـ RPC تحتاج إضافياً:
```
Authorization: Bearer <access_token>
```

---

## 2) Endpoints

### أ) تسجيل الدخول (email + password)
```
POST {SUPABASE_URL}/auth/v1/token?grant_type=password
Body: { "email": "...", "password": "..." }
```
الرد:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "...",
  "expires_in": 3600,
  "token_type": "bearer",
  "user": { "id": "uuid", "email": "..." }
}
```
أخطاء شائعة:
- `400 invalid_grant` → بريد/كلمة مرور خاطئة.
- `400 email_not_confirmed` → المستخدم لم يفعّل بريده. وجّهه لتفقّد الإيميل.

### ب) تجديد التوكن
نفّذ التجديد عند بقاء أقل من 60 ثانية على `expires_in`.
```
POST {SUPABASE_URL}/auth/v1/token?grant_type=refresh_token
Body: { "refresh_token": "..." }
```

### ج) جلب بيانات الحساب
```
GET {SUPABASE_URL}/rest/v1/profiles?id=eq.{user_id}&select=email,remaining_minutes,subscription_plan,usage_count
```
الرد: مصفوفة فيها صف واحد.

### د) خصم الدقائق (ذرّي وآمن)
يُستدعى **بعد نجاح التصدير فقط**:
```
POST {SUPABASE_URL}/rest/v1/rpc/consume_minutes
Body: {
  "_minutes": 1.5,
  "_source": "premiere",                 // أو "after_effects"
  "_metadata": { "project": "x.prproj", "duration_sec": 90 }
}
```
الرد:
```json
[ { "remaining_minutes": 3, "ok": true, "reason": "ok" } ]
```
أكواد `reason` المحتملة:
- `ok` — تم الخصم. اعرض `remaining_minutes` للمستخدم.
- `insufficient_minutes` — الرصيد غير كافٍ. وجّه المستخدم لـ `/pricing`.
- `unauthenticated` — التوكن منتهي/مفقود. أعد التجديد أو سجّل الدخول.
- `no_profile` / `invalid_minutes` — حالات نادرة، اعرض رسالة عامة.

> RPC تستخدم `FOR UPDATE` lock → آمنة من race conditions حتى لو فُتحت instances متعدّدة.

### هـ) تسجيل الخروج
```
POST {SUPABASE_URL}/auth/v1/logout
Header: Authorization: Bearer <access_token>
```

---

## 3) مثال JavaScript كامل (CEP / Vanilla JS)

```js
async function api(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...opts,
    headers: {
      apikey: ANON_KEY,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw Object.assign(new Error("HTTP " + res.status), { status: res.status, body: await res.text() });
  return res.json();
}

// 1. login
async function login(email, password) {
  const data = await api("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveTokens(data); // implement: write to encrypted file
  return data.user;
}

// 2. authed call
async function authed(path, opts = {}) {
  await ensureFreshToken(); // implement: refresh if <60s left
  const tokens = loadTokens();
  return api(path, {
    ...opts,
    headers: { Authorization: `Bearer ${tokens.access_token}`, ...(opts.headers || {}) },
  });
}

// 3. get profile
async function getProfile(userId) {
  const rows = await authed(`/rest/v1/profiles?id=eq.${userId}&select=email,remaining_minutes,subscription_plan,usage_count`);
  return rows[0];
}

// 4. consume minutes after render
async function consumeMinutes(minutes, source, metadata) {
  const rows = await authed(`/rest/v1/rpc/consume_minutes`, {
    method: "POST",
    body: JSON.stringify({ _minutes: minutes, _source: source, _metadata: metadata }),
  });
  return rows[0]; // { remaining_minutes, ok, reason }
}
```

---

## 4) تخزين التوكنات داخل الإضافة (CEP)

استخدم `cep_node.require('fs')` لكتابة الملف في:
- **macOS:** `~/Library/Application Support/Shuwaz/tokens.json`
- **Windows:** `%APPDATA%\Shuwaz\tokens.json`

شفّر الحقول حساسةً (مثلاً AES-256 بمفتاح ثابت في الإضافة) — يمنع القراءة العابرة.
عند الإقلاع: اقرأ → جدّد عبر `refresh_token` → خزّن الجديد فوراً.

---

## 5) تدفق التصدير الموصى به

1. **قبل التصدير:** `getProfile()` لعرض الرصيد في الواجهة.
2. احسب الطول التقديري للتايملاين بالدقائق.
3. لو `remaining_minutes < ceil(needed)` → عطّل زر التصدير وأظهر CTA للترقية → `https://shuwaz.com/pricing`.
4. ابدأ التصدير الفعلي.
5. **عند النجاح فقط:** `consumeMinutes(actualMinutes, "premiere", { project, duration_sec })`.
6. لو `ok=false && reason='insufficient_minutes'` (race) → احذف ملف الخرج واعتذر.

---

## 6) فحص سريع من الـ terminal

```bash
# login
curl -s "https://xkrvgnwawzzbegnyaycu.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: $ANON" -H "Content-Type: application/json" \
  -d '{"email":"test@x.com","password":"..."}'

# consume
curl -s "https://xkrvgnwawzzbegnyaycu.supabase.co/rest/v1/rpc/consume_minutes" \
  -H "apikey: $ANON" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"_minutes":1.5,"_source":"premiere"}'
```

---

## 7) الباقات والدقائق المبدئية

| الباقة | الدقائق |
|--------|---------|
| free   | 5       |
| pro    | 120     |
| agency | 300     |

كل مستخدم جديد يبدأ على `free` تلقائياً عبر trigger `on_auth_user_created`.
