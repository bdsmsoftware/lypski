import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"

const videos = [
  {
    title: "Fire Breathing Masterclass",
    thumbnail: "/placeholder.svg?height=300&width=500",
    duration: "3:45",
  },
  {
    title: "Machete Juggling Precision",
    thumbnail: "/placeholder.svg?height=300&width=500",
    duration: "2:30",
  },
  {
    title: "Street Performance Highlights",
    thumbnail: "/placeholder.svg?height=300&width=500",
    duration: "5:20",
  },
  {
    title: "Behind the Scenes",
    thumbnail: "/placeholder.svg?height=300&width=500",
    duration: "4:15",
  },
]

export function Videos() {
  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Videos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Experience the intensity and artistry in motion</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
