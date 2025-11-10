"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
  type CarouselPlugin,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import type {
  EmblaCarouselType,
  OptionsHandlerType,
  CreatePluginType
} from "embla-carousel";
import {
  Expand,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Quote,
} from "lucide-react";

/* ---------- 定义通用插件类型 ---------- */
type EmblaPlugin = CreatePluginType<{
  name: string;
  options?: Record<string, unknown>;
  init: (embla: EmblaCarouselType, optionsHandler: OptionsHandlerType) => void;
  destroy?: () => void;
}, Record<string, never>>;

/* ---------- helpers ---------- */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="flex flex-col gap-6">{children}</div>
  </section>
);

const Thumb = ({ src, alt, onClick, selected }: { src: string; alt: string; onClick: () => void; selected: boolean }) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded overflow-hidden border-2 transition",
      selected ? "border-blue-600" : "border-transparent opacity-60 hover:opacity-100"
    )}
  >
    <img src={src} alt={alt} className="h-20 w-full object-cover" />
  </button>
);

/* ---------- dynamic slides ---------- */
function DynamicSlides() {
  const [slides, setSlides] = useState([
    { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", alt: "Mountain" },
    { id: 2, src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", alt: "Lake" },
  ]);
  const addSlide = () =>
    setSlides((s) => [
      ...s,
      {
        id: Date.now(),
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
        alt: "City",
      },
    ]);
  const removeSlide = () => setSlides((s) => s.slice(0, -1));
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={addSlide}><Plus className="mr-2 h-4 w-4" />Add slide</Button>
        <Button variant="outline" onClick={removeSlide} disabled={slides.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />Remove
        </Button>
      </div>
      <Carousel className="w-full max-w-3xl">
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id}>
              <img src={s.src} alt={s.alt} className="rounded-lg object-cover h-64 md:h-96 w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

/* ---------- synchronized thumbnails ---------- */
function SyncThumbs() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", alt: "Mountain" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", alt: "Lake" },
    { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80", alt: "City" },
  ];
  const onThumbClick = useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  );
  useEffect(() => {
    if (!api) return;
    api.on("select", () => setSelected(api.selectedScrollSnap()));
  }, [api]);
  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full max-w-3xl">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <img src={img.src} alt={img.alt} className="rounded-lg object-cover h-64 md:h-96 w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <Thumb key={i} src={img.src} alt={img.alt} selected={i === selected} onClick={() => onThumbClick(i)} />
        ))}
      </div>
    </div>
  );
}

/* ---------- content cards ---------- */
function ContentCards() {
  const reviews = [
    { name: "Sophie Martin", role: "Marketing Lead", content: "This product changed the way we work. Absolutely love it!", avatar: "https://i.pravatar.cc/150?u=sophie" },
    { name: "James Liu", role: "Engineer", content: "Solid performance and great customer support.", avatar: "https://i.pravatar.cc/150?u=james" },
    { name: "Emma Wilson", role: "Designer", content: "Beautiful UI and smooth interactions.", avatar: "https://i.pravatar.cc/150?u=emma" },
  ];
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
      className="w-full max-w-4xl"
    >
      <CarouselContent>
        {reviews.map((r) => (
          <CarouselItem key={r.name} className="md:basis-1/2 lg:basis-1/3">
            <Card className="p-6 h-full flex flex-col justify-between">
              <Quote className="h-6 w-6 text-slate-400 mb-2" />
              <p className="text-sm text-slate-700 mb-4">“{r.content}”</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={r.avatar} />
                  <AvatarFallback>{r.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.role}</p>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

/* ---------- video + image mixed ---------- */
function MixedMedia() {
  const [muted, setMuted] = useState(true);
  const items = [
    { type: "image", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", alt: "Mountain" },
    { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80" },
  ];
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 8000 })]}
      className="w-full max-w-3xl"
    >
      <CarouselContent>
        {items.map((it, i) => (
          <CarouselItem key={i}>
            {it.type === "image" ? (
              <img src={it.src} alt={it.alt} className="rounded-lg object-cover h-64 md:h-96 w-full" />
            ) : (
              <div className="relative">
                <video
                  className="rounded-lg object-cover h-64 md:h-96 w-full"
                  src={it.src}
                  poster={it.poster}
                  autoPlay
                  loop
                  muted={muted}
                  controls
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => setMuted((m) => !m)}
                >
                  {muted ? <VolumeX /> : <Volume2 />}
                </Button>
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

/* ---------- fullscreen lightbox ---------- */
function Lightbox() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80", alt: "Mountain" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=80", alt: "Lake" },
    { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80", alt: "City" },
  ];
  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => { setIndex(0); setOpen(true); }}>
          <Expand className="mr-2 h-4 w-4" />
          Open Lightbox
        </Button>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <Carousel
            opts={{ startIndex: index, loop: true }}
            className="w-full max-w-5xl"
            onKeyDown={(e) => e.stopPropagation()}
          >
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-h-[90vh] object-contain mx-auto rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 text-white"
            onClick={() => setOpen(false)}
          >
            X
          </Button>
        </div>
      )}
    </>
  );
}

/* ---------- responsive per-view ---------- */
function ResponsivePerView() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full max-w-5xl"
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem key={i} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/4">
            <Card className="p-4">
              <img
                src={`https://picsum.photos/seed/city${i}/800/0?fit=cover`}
                alt={`img-${i}`}
                className="rounded-lg object-cover h-40 w-full"
              />
              <p className="text-sm mt-2 font-medium">Product {i + 1}</p>
              <p className="text-xs text-slate-500">$ { (i + 1) * 10 }</p>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

/* ---------- fade transition ---------- */
function FadeCarousel() {
  return (
    <Carousel
      plugins={[Fade()]}
      opts={{ loop: true }}
      className="w-full max-w-3xl"
    >
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, i) => (
          <CarouselItem key={i}>
            <img
              src={`https://picsum.photos/seed/food${i}/800/0?fit=cover`}
              alt={`fade-${i}`}
              className="rounded-lg object-cover h-64 md:h-96 w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

/* ---------- vertical carousel ---------- */
function VerticalCarousel() {
  return (
    <Carousel
      orientation="vertical"
      opts={{ loop: true }}
      className="h-96 w-full max-w-2xl"
    >
      <CarouselContent className="h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="h-full">
            <Card className="h-full flex items-center justify-center">
              <p className="text-2xl font-bold">Slide {i + 1}</p>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

/* ---------- custom dots ---------- */
function CustomDots() {
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const images = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", alt: "Mountain" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", alt: "Lake" },
    { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80", alt: "City" },
  ];
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <img src={img.src} alt={img.alt} className="rounded-lg object-cover h-64 md:h-96 w-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition",
              i === current ? "bg-blue-600 w-6" : "bg-slate-300 w-2"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- manual jump + rtl ---------- */
function ManualJump() {
  const [api, setApi] = useState<CarouselApi>();
  const [slides, setSlides] = useState(5);
  const jump = (index: number) => api?.scrollTo(index);
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {Array.from({ length: slides }).map((_, i) => (
            <CarouselItem key={i}>
              <Card className="flex items-center justify-center h-64">
                <p className="text-2xl font-bold">Slide {i + 1}</p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2">
        {Array.from({ length: slides }).map((_, i) => (
          <Button key={i} size="sm" variant="outline" onClick={() => jump(i)}>
            {i + 1}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Button size="sm" onClick={() => setSlides((s) => s + 1)}>Add slide</Button>
        <Button size="sm" variant="outline" onClick={() => setSlides((s) => Math.max(1, s - 1))}>
          Remove
        </Button>
      </div>
    </div>
  );
}

/* ---------- playground ---------- */
function Playground() {
  // 使用我们自定义的插件类型
  const [plugin, setPlugin] = useState<EmblaPlugin[]>([]);
  const [opts, setOpts] = useState({ loop: true, align: "center" as const });
  const [fade, setFade] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [duration, setDuration] = useState(4000);
  const [perView, setPerView] = useState(1);
  const [rtl, setRtl] = useState(false);

  useEffect(() => {
    const p: EmblaPlugin[] = [];
    if (autoplay) {
      // 类型断言
      p.push(Autoplay({ delay: duration }) as unknown as EmblaPlugin);
    }
    if (fade) {
      p.push(Fade() as unknown as EmblaPlugin);
    }
    setPlugin(p);
  }, [autoplay, duration, fade]);

  return (
    <section className="mb-12 border rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Playground</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} />
          Autoplay
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={fade} onChange={(e) => setFade(e.target.checked)} />
          Fade
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={vertical} onChange={(e) => setVertical(e.target.checked)} />
          Vertical
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={rtl} onChange={(e) => setRtl(e.target.checked)} />
          RTL
        </label>
        <label className="flex flex-col text-sm">
          Per-view
          <select
            className="mt-1 border rounded px-2 py-1"
            value={perView}
            onChange={(e) => setPerView(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
        <label className="flex flex-col text-sm">
          Duration (ms)
          <input
            type="number"
            className="mt-1 border rounded px-2 py-1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </label>
      </div>

      <Carousel
        orientation={vertical ? "vertical" : "horizontal"}
        dir={rtl ? "rtl" : "ltr"}
        opts={{ ...opts, slidesToScroll: 1 }}
        plugins={plugin}
        className={cn("w-full max-w-3xl", vertical ? "h-96" : "")}
      >
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem key={i} className={cn("basis-full", perView === 2 && "md:basis-1/2", perView === 3 && "md:basis-1/3")}>
              <Card className="h-64 flex items-center justify-center">
                <p className="text-2xl font-bold">Slide {i + 1}</p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}

/* ---------- main page ---------- */
export default function CarouselShowcase() {
  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Carousel Gallery</h1>

      <Playground />

      <Section title="Basic Image Carousel">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full max-w-3xl"
        >
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem key={i}>
                <img
                  src={`https://picsum.photos/seed/nature${i}/800/0?fit=cover`}
                  alt={`basic-${i}`}
                  className="rounded-lg object-cover h-64 md:h-96 w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </Section>

      <Section title="Multiple per view (Responsive)">
        <ResponsivePerView />
      </Section>

      <Section title="Fade Transition">
        <FadeCarousel />
      </Section>

      <Section title="Vertical Carousel">
        <VerticalCarousel />
      </Section>

      <Section title="Custom Dots Indicator">
        <CustomDots />
      </Section>

      <Section title="Synchronized Thumbnails">
        <SyncThumbs />
      </Section>

      <Section title="Content Cards (Testimonials)">
        <ContentCards />
      </Section>

      <Section title="Mixed Media (Image + Video)">
        <MixedMedia />
      </Section>

      <Section title="Full-screen Lightbox">
        <Lightbox />
      </Section>

      <Section title="Dynamic Add / Remove Slides">
        <DynamicSlides />
      </Section>

      <Section title="Manual Jump &amp; RTL">
        <ManualJump />
      </Section>
    </main>
  );
}