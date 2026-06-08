import type { LocalizedToolExtras } from "@/components/site/ToolExtras";

export const lafzContent: LocalizedToolExtras = {
  en: {
    about: {
      title: "Captions that match how you actually speak.",
      body: "Lafz is a captioning plugin built directly into Premiere Pro and After Effects. It listens to your clip, transcribes it word by word, and drops perfectly timed captions on your timeline — no exporting, no browser uploads, no waiting on a separate app.",
    },
    how: {
      title: "From raw clip to timed captions in three steps.",
      steps: [
        { title: "Open the Lafz panel", body: "Launch Lafz inside Premiere Pro or After Effects. No new app to learn — it lives in the panel you already use." },
        { title: "Select your clip", body: "Pick any audio or video clip on your timeline. Lafz reads it directly, including Arabic dialects and mixed-language speech." },
        { title: "Drop captions on the timeline", body: "Word-level timed captions land on a new track, fully styled and ready to edit, restyle or export." },
      ],
    },
    speed: {
      title: "Built to save you hours per project.",
      items: [
        { title: "Skip 2+ hours of manual typing", body: "A 10-minute clip that used to take 2 hours to caption now takes a few minutes." },
        { title: "No file shuffling", body: "Nothing to export, upload or re-import. Lafz works on the clip already in your project." },
        { title: "Frame-accurate sync", body: "Word-level timing means captions land exactly where they should — no nudging keyframes." },
        { title: "Edit in place", body: "Fix a word, restyle the font, change colors. Captions stay editable as native graphics." },
      ],
    },
    faq: {
      title: "Common questions about Lafz",
      items: [
        { q: "Which languages does Lafz support?", a: "Arabic (including major dialects) and English are fully supported, with mixed-language clips handled automatically." },
        { q: "How accurate is the transcription?", a: "Lafz reaches studio-grade accuracy on clean audio. Background noise or heavy overlap can lower accuracy slightly, and every word stays editable." },
        { q: "Can I edit captions after they’re generated?", a: "Yes — captions appear as native, fully editable text. Change wording, font, color, animation, anything." },
        { q: "Does Lafz work in both Premiere Pro and After Effects?", a: "Yes. The same plugin runs natively in both, and captions transfer cleanly between them." },
        { q: "Do I need to upload my video to a website?", a: "No. Lafz reads the clip from your timeline. Your footage never leaves your machine for editing." },
      ],
    },
  },
  ar: {
    about: {
      title: "كابشن يطابق طريقة كلامك فعلًا.",
      body: "لفظ إضافة كابشن مدمجة داخل Premiere Pro و After Effects. تستمع للمقطع، تكتب كل كلمة بتوقيتها، وتضع الكابشن جاهزًا على التايملاين — بدون تصدير ولا رفع لمواقع ولا انتظار تطبيق ثاني.",
    },
    how: {
      title: "من المقطع الخام إلى كابشن مُتزامن في ٣ خطوات.",
      steps: [
        { title: "افتح لوحة لفظ", body: "شغّل لفظ داخل بريمير أو أفترافكت. لا تطبيق جديد تتعلّمه — يعمل من نفس النافذة التي تستخدمها." },
        { title: "اختر المقطع", body: "اختر أي مقطع صوت أو فيديو من التايملاين. لفظ يقرأه مباشرة، ويفهم اللهجات والمزج بين العربية والإنجليزية." },
        { title: "ضع الكابشن على التايملاين", body: "كابشن متزامن على مستوى الكلمة يظهر على مسار جديد، جاهز للتنسيق والتعديل والتصدير." },
      ],
    },
    speed: {
      title: "صُنع ليوفّر عليك ساعات في كل مشروع.",
      items: [
        { title: "وفّر ٢+ ساعة كتابة يدوية", body: "مقطع ١٠ دقائق كان يأخذ ساعتين كابشن، صار بدقائق." },
        { title: "بدون نقل ملفات", body: "لا تصدير ولا رفع ولا إعادة استيراد. لفظ يشتغل على المقطع داخل مشروعك مباشرة." },
        { title: "تزامن بدقة الإطار", body: "توقيت على مستوى الكلمة يعني الكابشن في مكانه الصحيح دون تعديل كي فريمات." },
        { title: "عدّل في مكانه", body: "غيّر كلمة، الخط، اللون. الكابشن يبقى نصوصًا قابلة للتعديل بالكامل." },
      ],
    },
    faq: {
      title: "أسئلة شائعة عن لفظ",
      items: [
        { q: "ما اللغات التي يدعمها لفظ؟", a: "العربية (مع أهم اللهجات) والإنجليزية بالكامل، ويتعامل تلقائيًا مع المقاطع المختلطة." },
        { q: "ما مدى دقة التفريغ؟", a: "دقة عالية جدًا مع الصوت النظيف. الضوضاء أو التداخل الكثيف قد يقلّلها قليلًا، وكل كلمة قابلة للتعديل." },
        { q: "هل يمكنني تعديل الكابشن بعد توليده؟", a: "نعم — يظهر كنصوص أصلية قابلة للتعديل بالكامل (الكلمات، الخط، اللون، الحركة)." },
        { q: "هل يعمل لفظ في بريمير وأفترافكت؟", a: "نعم. نفس الإضافة تعمل في الاثنين، والكابشن ينتقل بينهما بسلاسة." },
        { q: "هل أحتاج رفع الفيديو لموقع؟", a: "لا. لفظ يقرأ المقطع من التايملاين، ولا يخرج الفيديو من جهازك أثناء التحرير." },
      ],
    },
  },
  fr: {
    about: {
      title: "Des sous-titres fidèles à votre façon de parler.",
      body: "Lafz est un plugin de sous-titrage intégré à Premiere Pro et After Effects. Il écoute votre clip, le transcrit mot à mot et dépose les sous-titres parfaitement calés sur votre timeline — sans export ni upload.",
    },
    how: {
      title: "Du rush brut aux sous-titres calés en trois étapes.",
      steps: [
        { title: "Ouvrez le panneau Lafz", body: "Lancez Lafz dans Premiere Pro ou After Effects. Aucun nouvel outil à apprendre." },
        { title: "Sélectionnez votre clip", body: "Choisissez un clip audio ou vidéo. Lafz lit directement, y compris les dialectes arabes et les mélanges de langues." },
        { title: "Déposez les sous-titres", body: "Sous-titres calés au mot près sur une nouvelle piste, prêts à éditer et exporter." },
      ],
    },
    speed: {
      title: "Conçu pour vous faire gagner des heures.",
      items: [
        { title: "Économisez 2h+ de saisie", body: "Un clip de 10 minutes passe de 2h de sous-titrage à quelques minutes." },
        { title: "Aucun va-et-vient de fichiers", body: "Rien à exporter, uploader ou réimporter." },
        { title: "Synchro à l’image près", body: "Le timing par mot place chaque sous-titre exactement où il faut." },
        { title: "Édition sur place", body: "Modifiez un mot, la police, la couleur. Tout reste éditable." },
      ],
    },
    faq: {
      title: "Questions fréquentes sur Lafz",
      items: [
        { q: "Quelles langues sont prises en charge ?", a: "Arabe (avec les principaux dialectes) et anglais, y compris les mélanges de langues." },
        { q: "Quelle est la précision ?", a: "Très élevée sur un audio propre. Le bruit ou les chevauchements peuvent la réduire légèrement." },
        { q: "Puis-je modifier les sous-titres ?", a: "Oui — ils apparaissent comme du texte natif entièrement éditable." },
        { q: "Compatible Premiere et After Effects ?", a: "Oui, le même plugin tourne dans les deux." },
        { q: "Faut-il uploader la vidéo ?", a: "Non. Lafz lit le clip directement depuis votre timeline." },
      ],
    },
  },
  pt: {
    about: {
      title: "Legendas que combinam com a forma como você fala.",
      body: "Lafz é um plugin de legendagem integrado ao Premiere Pro e After Effects. Ele escuta o clipe, transcreve palavra por palavra e coloca legendas perfeitamente sincronizadas na sua timeline — sem exportar nem fazer upload.",
    },
    how: {
      title: "Do clipe bruto às legendas em três passos.",
      steps: [
        { title: "Abra o painel Lafz", body: "Inicie o Lafz dentro do Premiere Pro ou After Effects." },
        { title: "Selecione o clipe", body: "Escolha qualquer clipe de áudio ou vídeo. Lafz lê direto, inclusive dialetos árabes e fala mista." },
        { title: "Solte as legendas na timeline", body: "Legendas sincronizadas por palavra prontas para editar e exportar." },
      ],
    },
    speed: {
      title: "Feito para economizar horas por projeto.",
      items: [
        { title: "Pule 2h+ de digitação", body: "10 minutos de clipe que levavam 2h agora levam minutos." },
        { title: "Sem troca de arquivos", body: "Nada para exportar, enviar ou reimportar." },
        { title: "Sincronia precisa", body: "Timing por palavra coloca cada legenda no lugar certo." },
        { title: "Edição no lugar", body: "Mude palavra, fonte ou cor — tudo continua editável." },
      ],
    },
    faq: {
      title: "Perguntas frequentes sobre Lafz",
      items: [
        { q: "Quais idiomas o Lafz suporta?", a: "Árabe (com dialetos) e inglês, incluindo fala mista." },
        { q: "Qual a precisão da transcrição?", a: "Muito alta com áudio limpo. Ruído pode reduzi-la levemente." },
        { q: "Posso editar as legendas?", a: "Sim — texto nativo totalmente editável." },
        { q: "Funciona no Premiere e After Effects?", a: "Sim, o mesmo plugin roda nos dois." },
        { q: "Preciso fazer upload do vídeo?", a: "Não. Lafz lê o clipe direto da sua timeline." },
      ],
    },
  },
  es: {
    about: {
      title: "Subtítulos que coinciden con cómo hablas en realidad.",
      body: "Lafz es un plugin de subtitulado integrado en Premiere Pro y After Effects. Escucha tu clip, lo transcribe palabra por palabra y coloca subtítulos perfectamente sincronizados en tu línea de tiempo — sin exportar ni subir.",
    },
    how: {
      title: "Del clip en bruto a los subtítulos en tres pasos.",
      steps: [
        { title: "Abre el panel de Lafz", body: "Inicia Lafz dentro de Premiere Pro o After Effects." },
        { title: "Selecciona tu clip", body: "Elige cualquier clip de audio o vídeo. Lafz lo lee directamente, incluidos dialectos árabes y voz mixta." },
        { title: "Coloca los subtítulos", body: "Subtítulos sincronizados por palabra listos para editar y exportar." },
      ],
    },
    speed: {
      title: "Hecho para ahorrarte horas por proyecto.",
      items: [
        { title: "Sáltate más de 2h de tipeo", body: "Un clip de 10 min pasa de 2h de subtitulado a unos minutos." },
        { title: "Sin mover archivos", body: "Nada que exportar, subir ni reimportar." },
        { title: "Sincronía cuadro a cuadro", body: "El timing por palabra coloca cada subtítulo justo donde debe." },
        { title: "Edita en el sitio", body: "Cambia palabra, fuente o color — todo sigue editable." },
      ],
    },
    faq: {
      title: "Preguntas frecuentes sobre Lafz",
      items: [
        { q: "¿Qué idiomas admite Lafz?", a: "Árabe (con dialectos) e inglés, incluyendo habla mixta." },
        { q: "¿Cuál es la precisión?", a: "Muy alta con audio limpio. El ruido puede reducirla un poco." },
        { q: "¿Puedo editar los subtítulos?", a: "Sí — texto nativo totalmente editable." },
        { q: "¿Funciona en Premiere y After Effects?", a: "Sí, el mismo plugin corre en ambos." },
        { q: "¿Tengo que subir el vídeo?", a: "No. Lafz lee el clip desde tu línea de tiempo." },
      ],
    },
  },
};

export const masarContent: LocalizedToolExtras = {
  en: {
    about: {
      title: "Documentary-grade animated maps, without the keyframe grind.",
      body: "Masar generates broadcast-quality animated map sequences — routes, pins, region highlights — directly inside After Effects and Premiere Pro. Plug in a location or path, choose a style, and Masar builds the animation for you as a fully editable composition.",
    },
    how: {
      title: "From location to finished map shot in three steps.",
      steps: [
        { title: "Drop the Masar panel", body: "Open Masar inside After Effects or Premiere Pro — no separate app, no extra render farm." },
        { title: "Pick a route or region", body: "Search a place or paste coordinates. Choose start, end and waypoints for an animated route, or a region to highlight." },
        { title: "Generate a comp", body: "Masar builds a fully animated comp with map, pins and route — ready to color, restyle and drop on your timeline." },
      ],
    },
    speed: {
      title: "Hours of map animation, automated.",
      items: [
        { title: "Skip manual keyframing", body: "What used to take a motion designer an afternoon now takes a couple of minutes." },
        { title: "Editable, not flattened", body: "Masar outputs a real comp with layers — restyle colors, fonts and timing without re-rendering." },
        { title: "Premiere & After Effects", body: "Use the same plugin in either host. Generated maps move between them cleanly." },
        { title: "Documentary-ready styles", body: "Multiple cinematic looks: vintage atlas, satellite, minimalist, and more." },
      ],
    },
    faq: {
      title: "Common questions about Masar",
      items: [
        { q: "What kind of maps can Masar generate?", a: "Animated route maps (point-to-point with waypoints), highlighted regions, animated pins, and stylized location reveals." },
        { q: "Does it render as a video or as a comp?", a: "As a fully editable composition with layers. You stay in control of colors, timing and styling." },
        { q: "Do I need an internet connection?", a: "Yes, for fetching map data. The animation builds locally inside After Effects." },
        { q: "Can I use my own coordinates or GPX?", a: "Yes — paste coordinates or import a path to build a custom animated route." },
        { q: "Is Masar available now?", a: "Masar is in early access. Joining now gives you priority onboarding and early-access pricing." },
      ],
    },
  },
  ar: {
    about: {
      title: "خرائط متحركة بمستوى الأفلام الوثائقية، بدون كي فريمات يدوية.",
      body: "مسار يولّد خرائط متحركة بجودة بثّ تلفزيوني — مسارات، دبابيس، إبراز مناطق — مباشرة داخل After Effects و Premiere Pro. تختار الموقع أو المسار، تختار الستايل، ويبني لك مسار الأنميشن كاملًا كـ Composition قابل للتعديل.",
    },
    how: {
      title: "من اسم المكان إلى مشهد خريطة جاهز في ٣ خطوات.",
      steps: [
        { title: "افتح لوحة مسار", body: "افتح مسار داخل أفترافكت أو بريمير — بدون تطبيق ثاني ولا مزرعة رندر." },
        { title: "اختر المسار أو المنطقة", body: "ابحث عن مكان أو الصق إحداثيات. حدد البداية والنهاية ومحطات وسط، أو منطقة لإبرازها." },
        { title: "أنشئ الـ Comp", body: "مسار يبني Composition متحرك كامل بالخريطة والدبابيس والمسار — جاهز للتلوين والتنسيق ووضعه على التايملاين." },
      ],
    },
    speed: {
      title: "ساعات من أنميشن الخرائط، أوتوماتيكيًا.",
      items: [
        { title: "بدون كي فريمات يدوية", body: "ما كان يأخذ من موشن ديزاينر يومًا كاملًا، يصير دقائق." },
        { title: "قابل للتعديل، ليس مسطّحًا", body: "مسار يخرج Comp حقيقي بطبقات — غيّر الألوان والخطوط والتوقيت دون إعادة رندر." },
        { title: "أفترافكت وبريمير", body: "نفس الإضافة في الاثنين، والخرائط تنتقل بسلاسة بينهما." },
        { title: "ستايلات وثائقية", body: "عدة أساليب سينمائية: أطلس قديم، أقمار صناعية، حداثي، وغيرها." },
      ],
    },
    faq: {
      title: "أسئلة شائعة عن مسار",
      items: [
        { q: "ما أنواع الخرائط التي يولّدها مسار؟", a: "خرائط مسارات (من نقطة لنقطة مع محطات)، مناطق مُبرَزة، دبابيس متحركة، وكشف مواقع بستايل سينمائي." },
        { q: "هل المخرج فيديو أم Comp؟", a: "Composition قابل للتعديل بالكامل بطبقات — أنت تتحكم بالألوان والتوقيت والستايل." },
        { q: "هل أحتاج إنترنت؟", a: "نعم لجلب بيانات الخريطة، والأنميشن يُبنى محليًا داخل أفترافكت." },
        { q: "هل أقدر أستخدم إحداثياتي أو ملف GPX؟", a: "نعم — الصق الإحداثيات أو استورد مسارًا لبناء طريق متحرك مخصص." },
        { q: "هل مسار متاح الآن؟", a: "مسار في الوصول المبكر. الاشتراك الآن يمنحك أولوية الانضمام وأسعار مبكرة." },
      ],
    },
  },
  fr: {
    about: {
      title: "Cartes animées dignes du documentaire, sans keyframes à la main.",
      body: "Masar génère des séquences cartographiques animées de qualité broadcast — routes, épingles, mises en avant de régions — directement dans After Effects et Premiere Pro, sous forme de composition éditable.",
    },
    how: {
      title: "Du lieu à la séquence finie en trois étapes.",
      steps: [
        { title: "Ouvrez le panneau Masar", body: "Lancez Masar dans After Effects ou Premiere Pro." },
        { title: "Choisissez un trajet ou une région", body: "Cherchez un lieu, collez des coordonnées, ajoutez des étapes." },
        { title: "Générez la composition", body: "Masar construit une comp animée prête à styliser." },
      ],
    },
    speed: {
      title: "Des heures d’animation cartographique, automatisées.",
      items: [
        { title: "Plus de keyframes manuels", body: "Ce qui prenait un après-midi prend quelques minutes." },
        { title: "Éditable, pas aplati", body: "Vraie comp avec calques — restylez sans re-rendre." },
        { title: "Premiere & After Effects", body: "Même plugin dans les deux hôtes." },
        { title: "Styles documentaires", body: "Atlas vintage, satellite, minimaliste, et plus." },
      ],
    },
    faq: {
      title: "Questions fréquentes sur Masar",
      items: [
        { q: "Quels types de cartes ?", a: "Trajets animés, régions en surbrillance, épingles animées, révélations stylisées." },
        { q: "Sortie vidéo ou comp ?", a: "Composition entièrement éditable." },
        { q: "Faut-il Internet ?", a: "Oui pour récupérer les données, l’animation se construit localement." },
        { q: "Coordonnées personnelles ou GPX ?", a: "Oui, collez ou importez un tracé." },
        { q: "Masar est-il disponible ?", a: "En accès anticipé — priorité et tarifs préférentiels en s’inscrivant." },
      ],
    },
  },
  pt: {
    about: {
      title: "Mapas animados de nível documentário, sem keyframes manuais.",
      body: "Masar gera mapas animados com qualidade de broadcast — rotas, pins, destaques de regiões — direto no After Effects e Premiere Pro, como composição editável.",
    },
    how: {
      title: "Do local à cena de mapa finalizada em três passos.",
      steps: [
        { title: "Abra o painel Masar", body: "Inicie Masar no After Effects ou Premiere Pro." },
        { title: "Escolha a rota ou região", body: "Pesquise um lugar, cole coordenadas, defina paradas." },
        { title: "Gere a comp", body: "Masar monta uma composição animada pronta para estilizar." },
      ],
    },
    speed: {
      title: "Horas de animação de mapa, automatizadas.",
      items: [
        { title: "Sem keyframes manuais", body: "O que levava uma tarde, leva minutos." },
        { title: "Editável, não achatado", body: "Comp real com camadas — sem re-render." },
        { title: "Premiere & After Effects", body: "Mesmo plugin nos dois." },
        { title: "Estilos documentários", body: "Atlas vintage, satélite, minimalista e mais." },
      ],
    },
    faq: {
      title: "Perguntas frequentes sobre Masar",
      items: [
        { q: "Que tipos de mapas?", a: "Rotas animadas, regiões destacadas, pins, revelações estilizadas." },
        { q: "Sai como vídeo ou comp?", a: "Composição totalmente editável." },
        { q: "Precisa de internet?", a: "Sim para dados; animação local." },
        { q: "Posso usar coordenadas ou GPX?", a: "Sim, cole ou importe um traçado." },
        { q: "Masar já está disponível?", a: "Em acesso antecipado — prioridade e preço inicial." },
      ],
    },
  },
  es: {
    about: {
      title: "Mapas animados de nivel documental, sin keyframes manuales.",
      body: "Masar genera secuencias de mapas animados con calidad de broadcast — rutas, pines, regiones destacadas — directamente en After Effects y Premiere Pro, como composición editable.",
    },
    how: {
      title: "Del lugar a la toma final en tres pasos.",
      steps: [
        { title: "Abre el panel de Masar", body: "Inicia Masar en After Effects o Premiere Pro." },
        { title: "Elige la ruta o región", body: "Busca un lugar, pega coordenadas, añade paradas." },
        { title: "Genera la comp", body: "Masar arma una composición animada lista para estilizar." },
      ],
    },
    speed: {
      title: "Horas de animación de mapas, automatizadas.",
      items: [
        { title: "Sin keyframes manuales", body: "Lo que tomaba una tarde, ahora minutos." },
        { title: "Editable, no aplanado", body: "Comp real con capas — sin re-renderizar." },
        { title: "Premiere y After Effects", body: "El mismo plugin en ambos." },
        { title: "Estilos documentales", body: "Atlas vintage, satélite, minimalista y más." },
      ],
    },
    faq: {
      title: "Preguntas frecuentes sobre Masar",
      items: [
        { q: "¿Qué tipo de mapas?", a: "Rutas animadas, regiones destacadas, pines, revelaciones estilizadas." },
        { q: "¿Sale como vídeo o como comp?", a: "Composición totalmente editable." },
        { q: "¿Necesito internet?", a: "Sí para datos; la animación se construye localmente." },
        { q: "¿Coordenadas propias o GPX?", a: "Sí, pega o importa un trazado." },
        { q: "¿Masar está disponible?", a: "En acceso anticipado — prioridad y precio inicial." },
      ],
    },
  },
};

export const cutlayerContent: LocalizedToolExtras = {
  en: {
    about: {
      title: "Studio-grade background removal, native to your editor.",
      body: "CutLayer extracts a clean alpha matte from your footage or stills — including hair, edges and motion — without leaving Premiere Pro or After Effects. No green screen, no rotoscoping, no exporting to a browser tool.",
    },
    how: {
      title: "From source clip to clean alpha in three steps.",
      steps: [
        { title: "Open the CutLayer panel", body: "Run CutLayer inside After Effects or Premiere Pro." },
        { title: "Select the subject", body: "Pick the clip or still. CutLayer detects the subject automatically — people, objects, even hair detail." },
        { title: "Get a clean matte", body: "An alpha-channel layer drops onto your timeline, ready to composite, color or animate." },
      ],
    },
    speed: {
      title: "Skip rotoscoping. Stay in your timeline.",
      items: [
        { title: "No more frame-by-frame roto", body: "Hours of rotoscoping become a one-click matte." },
        { title: "No browser tools", body: "Your footage never leaves your editor. No upload, no download, no re-import." },
        { title: "Hair and edge detail", body: "AI edge refinement preserves the details traditional keying loses." },
        { title: "Stills and motion", body: "Works on single frames and on moving footage." },
      ],
    },
    faq: {
      title: "Common questions about CutLayer",
      items: [
        { q: "Does CutLayer handle hair and soft edges?", a: "Yes — edge refinement is built for hair, fur and semi-transparent edges that defeat traditional keyers." },
        { q: "Does it work on video, or only stills?", a: "Both. Single frames and motion footage are supported." },
        { q: "Do I need a GPU?", a: "A modern GPU is recommended for the fastest video processing, but CutLayer will run on CPU." },
        { q: "What export formats are supported?", a: "Native alpha-channel layers inside After Effects and Premiere Pro, plus exports as PNG sequences, ProRes 4444 or other alpha-capable formats." },
        { q: "When is CutLayer available?", a: "CutLayer is in early access (Q3 2026 target). Joining now secures early-access pricing." },
      ],
    },
  },
  ar: {
    about: {
      title: "عزل خلفية بمستوى الاستوديو، داخل برنامج المونتاج مباشرة.",
      body: "كات لاير يستخرج ماط شفاف نظيف من فيديوهاتك أو صورك — مع الشعر والحواف والحركة — دون مغادرة Premiere Pro أو After Effects. بدون جرين سكرين ولا روتو ولا تصدير لمواقع خارجية.",
    },
    how: {
      title: "من المقطع الأصلي إلى ماط نظيف في ٣ خطوات.",
      steps: [
        { title: "افتح لوحة كات لاير", body: "شغّل كات لاير داخل أفترافكت أو بريمير." },
        { title: "اختر العنصر", body: "اختر المقطع أو الصورة. كات لاير يكتشف العنصر تلقائيًا — أشخاص، أشياء، حتى تفاصيل الشعر." },
        { title: "احصل على ماط نظيف", body: "طبقة بقناة ألفا تنزل على التايملاين، جاهزة للتركيب والتلوين والأنميشن." },
      ],
    },
    speed: {
      title: "وداعًا للروتو. ابقَ داخل برنامجك.",
      items: [
        { title: "بدون روتو فريم-بي-فريم", body: "ساعات الروتو تصير ماط بضغطة." },
        { title: "بدون مواقع خارجية", body: "فيديوهاتك لا تخرج من البرنامج — لا رفع ولا تحميل ولا إعادة استيراد." },
        { title: "تفاصيل الشعر والحواف", body: "تحسين حواف بالذكاء الاصطناعي يحافظ على ما يفقده الكيير التقليدي." },
        { title: "صور وفيديو", body: "يعمل على الإطارات الواحدة والفيديو المتحرك." },
      ],
    },
    faq: {
      title: "أسئلة شائعة عن كات لاير",
      items: [
        { q: "هل يتعامل كات لاير مع الشعر والحواف الناعمة؟", a: "نعم — تحسين الحواف مصمم خصيصًا للشعر والحواف نصف الشفافة التي تفشل فيها أدوات الكيير التقليدية." },
        { q: "هل يعمل على الفيديو أم الصور فقط؟", a: "الاثنان. صور منفردة وفيديو متحرك." },
        { q: "هل أحتاج كرت شاشة قوي؟", a: "كرت حديث يُنصح به لسرعة معالجة الفيديو، لكن كات لاير يعمل على المعالج أيضًا." },
        { q: "ما صيغ التصدير المدعومة؟", a: "طبقات ألفا أصلية داخل أفترافكت وبريمير، وتصدير PNG sequences و ProRes 4444 وغيرها." },
        { q: "متى يتوفر كات لاير؟", a: "في الوصول المبكر (المستهدف Q3 2026). الاشتراك الآن يضمن سعرًا مبكرًا." },
      ],
    },
  },
  fr: {
    about: {
      title: "Détourage qualité studio, natif dans votre éditeur.",
      body: "CutLayer extrait un cache alpha propre — cheveux, contours, mouvement — sans quitter Premiere Pro ou After Effects.",
    },
    how: {
      title: "Du clip source au cache alpha en trois étapes.",
      steps: [
        { title: "Ouvrez le panneau CutLayer", body: "Lancez CutLayer dans After Effects ou Premiere Pro." },
        { title: "Sélectionnez le sujet", body: "Détection automatique du sujet, y compris les cheveux." },
        { title: "Obtenez un cache propre", body: "Un calque alpha apparaît sur la timeline." },
      ],
    },
    speed: {
      title: "Plus de rotoscopie. Restez dans votre timeline.",
      items: [
        { title: "Fini la roto image par image", body: "Des heures deviennent un clic." },
        { title: "Aucun outil web", body: "Vos rushes ne quittent jamais l’éditeur." },
        { title: "Cheveux et contours fins", body: "L’IA préserve les détails que le keying classique perd." },
        { title: "Photos et vidéos", body: "Fonctionne sur image fixe et vidéo." },
      ],
    },
    faq: {
      title: "Questions fréquentes sur CutLayer",
      items: [
        { q: "Gère-t-il les cheveux ?", a: "Oui, le raffinement de contours est conçu pour les cheveux et bords semi-transparents." },
        { q: "Vidéo ou seulement photo ?", a: "Les deux." },
        { q: "Faut-il un GPU ?", a: "Recommandé pour la vidéo, mais fonctionne sur CPU." },
        { q: "Formats d’export ?", a: "Alpha natif AE/Premiere, séquences PNG, ProRes 4444, etc." },
        { q: "Disponible quand ?", a: "Accès anticipé — cible Q3 2026." },
      ],
    },
  },
  pt: {
    about: {
      title: "Remoção de fundo nível estúdio, nativa no seu editor.",
      body: "CutLayer extrai um alpha matte limpo — cabelo, bordas, movimento — sem sair do Premiere Pro ou After Effects.",
    },
    how: {
      title: "Do clipe ao alpha limpo em três passos.",
      steps: [
        { title: "Abra o painel CutLayer", body: "Inicie CutLayer no After Effects ou Premiere Pro." },
        { title: "Selecione o sujeito", body: "Detecção automática, incluindo cabelo." },
        { title: "Receba um matte limpo", body: "Camada alpha aparece na timeline." },
      ],
    },
    speed: {
      title: "Sem rotoscopia. Dentro da sua timeline.",
      items: [
        { title: "Sem roto quadro a quadro", body: "Horas viram um clique." },
        { title: "Sem ferramentas web", body: "Seu material nunca sai do editor." },
        { title: "Cabelo e bordas", body: "IA preserva o que o keying tradicional perde." },
        { title: "Fotos e vídeo", body: "Funciona em ambos." },
      ],
    },
    faq: {
      title: "Perguntas frequentes sobre CutLayer",
      items: [
        { q: "Lida com cabelo?", a: "Sim, com refinamento de bordas dedicado." },
        { q: "Vídeo ou só foto?", a: "Ambos." },
        { q: "Preciso de GPU?", a: "Recomendado para vídeo, mas roda em CPU." },
        { q: "Formatos de exportação?", a: "Alpha nativo AE/Premiere, PNG sequence, ProRes 4444." },
        { q: "Quando estará disponível?", a: "Acesso antecipado — meta Q3 2026." },
      ],
    },
  },
  es: {
    about: {
      title: "Eliminación de fondo nivel estudio, nativa en tu editor.",
      body: "CutLayer extrae un matte alpha limpio — pelo, bordes, movimiento — sin salir de Premiere Pro o After Effects.",
    },
    how: {
      title: "Del clip al alpha limpio en tres pasos.",
      steps: [
        { title: "Abre el panel de CutLayer", body: "Inicia CutLayer en After Effects o Premiere Pro." },
        { title: "Selecciona el sujeto", body: "Detección automática, incluido el pelo." },
        { title: "Recibe un matte limpio", body: "Una capa alpha aparece en tu línea de tiempo." },
      ],
    },
    speed: {
      title: "Adiós a la rotoscopia. Quédate en tu timeline.",
      items: [
        { title: "Sin roto cuadro a cuadro", body: "Horas se vuelven un clic." },
        { title: "Sin herramientas web", body: "Tu material nunca sale del editor." },
        { title: "Pelo y bordes finos", body: "La IA preserva lo que el keying clásico pierde." },
        { title: "Fotos y vídeo", body: "Funciona en ambos." },
      ],
    },
    faq: {
      title: "Preguntas frecuentes sobre CutLayer",
      items: [
        { q: "¿Maneja el pelo?", a: "Sí, con refinamiento de bordes específico." },
        { q: "¿Vídeo o solo foto?", a: "Ambos." },
        { q: "¿Necesito GPU?", a: "Recomendada para vídeo, pero funciona en CPU." },
        { q: "¿Formatos de exportación?", a: "Alpha nativo AE/Premiere, secuencias PNG, ProRes 4444." },
        { q: "¿Cuándo está disponible?", a: "Acceso anticipado — objetivo Q3 2026." },
      ],
    },
  },
};
