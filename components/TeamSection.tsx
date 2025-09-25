import { getTeam } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import TeamCard from '@/components/TeamCard'

export default async function TeamSection() {
  const team = await getTeam() as TeamMember[]

  return (
    <section id="team" className="section-padding bg-cream-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Équipe
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rencontrez les artisans passionnés qui donnent vie à l'expérience 
            Les Racines d'Or, chacun apportant son expertise unique.
          </p>
        </div>

        {team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>Informations sur l'équipe non disponibles pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}