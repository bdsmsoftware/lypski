"use client"
import { Button } from "@/components/ui/button"
import { Flame, Zap } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center md:items-stretch min-h-screen">
          <div className="md:col-span-3 flex flex-col justify-center text-center md:text-left">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  LYPSKI
                </span>
              </h1>
              <div className="flex items-center space-x-4 mb-6 justify-center md:justify-start">
                <p className="text-2xl md:text-2xl text-gray-300 font-bold md:font-light">
                  Street Performer • Actor • Improviser
                </p>
              </div>
            </div>

            <div className="block md:hidden relative w-full aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 mb-8">
              <Image
                src="/images/hero-mobile.jpg"
                alt="Lypski performing with fire"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Marcin Lypski is a street performer, actor, and entertainer whose shows fuse raw street energy, audacious
              circus challenges, and craft honed through elite European film‑school training. Expect razor‑sharp precision,
              playful improvisation, and fearless crowd work—spectacles that turn city squares into stages and audiences
              into co‑creators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button
                onClick={scrollToGallery}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 sm:px-8 sm:py-3 text-lg font-semibold"
              >
                View Gallery
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-10 py-4 sm:px-8 sm:py-3 text-lg font-semibold bg-transparent"
              >
                Book Performance
              </Button>
            </div>
          </div>

          <div className="relative w-full md:col-span-2 h-[28rem] sm:h-[32rem] md:min-h-screen overflow-hidden rounded-xl ring-1 ring-white/10 hidden md:block">
            <Image
              src="/images/3.jpg"
              alt="Lypski performing with fire"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
