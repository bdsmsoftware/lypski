"use client"

import { useState } from "react"
import { Menu, X, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-orange-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              LYPSKI
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Contact
            </button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block text-white hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block text-white hover:text-orange-500 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block text-white hover:text-orange-500 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="block text-white hover:text-orange-500 transition-colors"
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block text-white hover:text-orange-500 transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
