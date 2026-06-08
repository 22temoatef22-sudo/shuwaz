import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "الأسعار — شُوَاظ" },
      { name: "description", content: "خطط أسعار شُوَاظ لصُنّاع المحتوى العربي. ابدأ مجانًا واختر الباقة المناسبة لإنتاجك." },
      { property: "og:title", content: "الأسعار — شُوَاظ" },
      { property: "og:description", content: "خطط بسيطة لصُنّاع محتوى جادّين. مجاني للتجربة بدون بطاقة ائتمان." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10">
        <Pricing />
      </main>
    </div>
  );
}
