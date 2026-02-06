import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Video, Settings, Share2, Zap, Palette, Music, Type } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuidesPage() {
  const guides = [
    {
      title: "Creating Your First Series",
      description: "Learn how to generate your first AI video series in minutes.",
      icon: Sparkles,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      steps: [
        "Click 'Create New Series' on the dashboard.",
        "Select your niche and topic (e.g., 'Scary Stories').",
        "Choose a voice and background music.",
        "Select a visual style (e.g., 'Realistic', 'Cartoon').",
        "Click 'Create Series' to generate your script."
      ]
    },
    {
      title: "Customizing Video Styles",
      description: "Master the art of prompt engineering for better visuals.",
      icon: Palette,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      steps: [
        "Navigate to Series Settings.",
        "Choose from our preset styles or 'Custom'.",
        "Use descriptive keywords like 'Cinematic', '4k', 'Trending'.",
        "Preview the style examples before confirming."
      ]
    },
    {
      title: "Voice & Audio Mastery",
      description: "How to select the perfect voice for your content.",
      icon: Music,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      steps: [
        "Listen to voice previews in the creation wizard.",
        "Match the voice energy to your content niche.",
        "Select appropriate background music genre.",
        "Adjust audio levels in the final editor (Coming Soon).",
      ]
    },
    {
      title: "Captions & Typography",
      description: "Make your text pop with advanced caption styles.",
      icon: Type,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      steps: [
        "Choose a caption preset (e.g., 'Alex Hormozi Style').",
        "Customize font family and colors.",
        "Enable or disable dynamic animations.",
        "Ensure text contrast for readability."
      ]
    }
  ];

  return (
    <div className="container mx-auto max-w-5xl space-y-10 pb-10 animate-in fade-in duration-500">
        <div className="text-center space-y-4 py-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Master Zynova
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unlock the full potential of AI automation. Browse our expert guides to create viral content faster.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
                <Card key={i} className="border-none shadow-lg bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 group">
                    <CardHeader className="space-y-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${guide.bg} ${guide.color} transition-transform group-hover:scale-110`}>
                            <guide.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">{guide.title}</CardTitle>
                            <CardDescription className="text-base mt-1">{guide.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {guide.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${guide.color} border-current opacity-70`}>
                                        {idx + 1}
                                    </span>
                                    <span className="mt-0.5">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10">
                <Zap size={250} />
             </div>
             <div className="relative z-10 max-w-2xl">
                 <h2 className="text-3xl font-bold mb-4">Ready to create your next viral hit?</h2>
                 <p className="text-blue-100 mb-8 text-lg">
                     Put these guides into practice and start generating high-quality short videos today.
                 </p>
                 <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg">
                     <Link href="/dashboard/create">
                        Start Creating Now
                     </Link>
                 </Button>
             </div>
        </div>
    </div>
  );
}
