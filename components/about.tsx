import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              About Lypski
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Fusing street performance, acting and improvisation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">The touch of fire</h3>
            <p className="text-lg">
              Marcin is a street performer, actor, and entertainer in equal measure. His shows are a high‑voltage fusion
              of raw street energy, audacious circus challenges, and craft refined through rigorous actor training at a
              leading European film school.
            </p>
            <br />
            <p className="text-lg mt-4">
              Rooted in improvisation theatre, he reads the crowd in real time—pivoting,
              riffing, and reshaping each moment so no two performances are ever the same. He welcomes hecklers as
              features, not bugs, turning sharp wit into sharper crowd work. Beneath the spontaneity sits meticulous
              technique.
            </p>
            <br />
            <p className="text-lg mt-4">
              Beyond the street, Marcin’s screen and voice work extend his range—he can be seen on Netflix and heard on
              Disney+. That versatility feeds back into the street: the storytelling, timing, and presence of a trained
              actor amplify the danger, joy, and laughter of live spectacle. Whether igniting a festival stage or
              electrifying a corner of the city, he builds a shared experience where audience and artist create the moment
              together. Every show is personal, playful, and unforgettable.
            </p>

          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-orange-500/30">
              <img
                src="/images/6.jpg"
                alt="Lypski performing fire breathing"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        <div className="max-w-4xl mx-auto text-gray-300 leading-relaxed mb-16 space-y-6">

        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                +1000
              </h4>
              <p className="text-gray-400 uppercase tracking-wide">Shows</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                +10
              </h4>
              <p className="text-gray-400 uppercase tracking-wide">Years Experience</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <h4 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                3
              </h4>
              <p className="text-gray-400 uppercase tracking-wide">Continents</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
