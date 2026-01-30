import { Wand2, CalendarClock, TrendingUp, Share2, Mail, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Video Gen",
    description: "Turn text prompts into viral short videos in seconds with our advanced AI engine.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: CalendarClock,
    title: "Smart Scheduler",
    description: "Auto-schedule your content for optimal posting times across all time zones.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Track performance with real-time insights on views, engagement, and retention.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Share2,
    title: "Multi-Platform",
    description: "Publish to YouTube Shorts, TikTok, and Instagram Reels with a single click.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Convert viewers into subscribers with integrated email capture and newsletters.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: LayoutTemplate,
    title: "Templates Library",
    description: "Access thousands of trending templates to keep your content fresh and engaging.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to go viral
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Powerful tools designed for creators, marketers, and businesses to dominate short-form video.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border bg-background p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
