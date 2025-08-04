import { Card, CardContent } from "@/components/ui/card"
import { Flame, Target, Users, Award } from "lucide-react"

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
            A master of fire and steel, bringing danger and beauty together in unforgettable performances
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">The Art of Fire & Steel</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              For over a decade, Lypski has been pushing the boundaries of street performance art. Combining the ancient
              art of fire breathing with the precision skill of machete juggling, each performance is a carefully
              choreographed dance between danger and beauty.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              From intimate street corners to grand festival stages, Lypski has captivated audiences worldwide with
              performances that blur the line between art and adrenaline.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every flame tells a story. Every blade cuts through the ordinary to reveal the extraordinary.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-orange-500/30">
              <img
                src="/images/fire-performance.jpg"
                alt="Lypski performing fire breathing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Flame className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Fire Breathing</h4>
              <p className="text-gray-400">Mastering the ancient art of controlled flame</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Machete Juggling</h4>
              <p className="text-gray-400">Precision and skill with razor-sharp blades</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Street Performance</h4>
              <p className="text-gray-400">Connecting with audiences in raw, authentic ways</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-500/60 transition-colors">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">10+ Years</h4>
              <p className="text-gray-400">Of professional performance experience</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
