import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Hero() {
  return (
    <section className="relative pt-16 md:pt-24 lg:pt-32 pb-16">
      {/* Background gradients removed - now using global AntigravityEffects */}

      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          New AI Model V2.0 Released
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent drop-shadow-sm animate-fade-in-up delay-100">
          Create Viral Short Videos with AI in Seconds
        </h1>

        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl animate-fade-in-up delay-200">
          Zynova is the all-in-one platform to generate, edit, and schedule
          high-retention content for YouTube Shorts, Instagram Reels, and
          TikTok.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="rounded-full text-base px-8 h-12 shadow-lg shadow-white/10 bg-white text-black hover:bg-white/90"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button
              size="lg"
              className="rounded-full text-base px-8 h-12 shadow-lg shadow-white/10 bg-white text-black hover:bg-white/90"
              asChild
            >
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SignedIn>
        </div>

        <div className="mt-12 w-full max-w-5xl rounded-xl border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-video animate-fade-in-up delay-500 relative group cursor-pointer hover:border-primary/50 transition-colors">
          {/* Placeholder for Video/Dashboard UI */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-colors duration-500 group-hover:bg-black/30">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-primary fill-primary ml-1" />
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                See how it works
              </p>
            </div>
          </div>
          {/* Mock UI Elements for decoration */}
          {/* Movie-style Image Grid Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid grid-cols-12 gap-2 h-full p-2 opacity-50 group-hover:opacity-80 transition-opacity duration-700">
              <div className="col-span-4 relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  // src="/video-style/a8efaed00ff04f89d5bb040bba1813d9.jpg"
                  src="/video-style/962c0a25068a15b67313a2f1ce2f12b7.jpg"
                  alt="Movie Poster 1"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="col-span-8 grid grid-rows-2 gap-2 h-full">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    // src="/video-style/962c0a25068a15b67313a2f1ce2f12b7.jpg"
                     src="/video-style/a8efaed00ff04f89d5bb040bba1813d9.jpg"
                    alt="Movie Scene 1"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 h-full">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src="/video-style/311053881cb521b555132d6edf7ea8ea.jpg"
                      alt="Movie Scene 2"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src="/video-style/4839f74dd88436b9b3c1594dd8661f55.jpg"
                      alt="Movie Scene 3"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
