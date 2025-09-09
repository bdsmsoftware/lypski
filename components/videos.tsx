import { Card, CardContent } from "@/components/ui/card"

const videos = [
  {
    title: "Street Performance",
    id: "nd3gfIAf0cg",
  },
  {
    title: "Events",
    id: "_1u3ToeyoTM",
  },
  {
    title: "Festivals",
    id: "oXLnmNiFeVA",
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

        <div className="grid md:grid-cols-3 gap-8 ">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 overflow-hidden p-0"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  {video.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&color=white`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400">
                      Coming soon
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
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
