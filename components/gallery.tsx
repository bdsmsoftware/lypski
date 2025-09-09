"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/images/fire-performance.jpg",
    alt: "Fire breathing performance",
    title: "Fire Breathing Mastery",
  },
  {
    src: "/images/g1.jpg",
    alt: "Machete juggling performance",
    title: "Blade Precision",
  },
  {
    src: "/images/g3.jpg",
    alt: "Crowd watching fire performance",
    title: "Captivating Audiences",
  },
  {
    src: "/images/g2.jpg",
    alt: "Urban fire performance",
    title: "Urban Fire Art",
  },
  {
    src: "/images/g6.jpg",
    alt: "Close-up machete juggling",
    title: "Steel & Skill",
  },
  {
    src: "/images/g5.jpg",
    alt: "Fire breathing silhouette",
    title: "Dancing with Fire",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Captured moments of fire, steel, and artistry in motion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 cursor-pointer group overflow-hidden p-0"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:text-orange-500"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-8 w-8" />
              </Button>
              <Image
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
                width={800}
                height={1000}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-bold">{galleryImages[selectedImage].title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
