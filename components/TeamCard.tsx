import { TeamMember } from '@/types'

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const imageUrl = member.metadata?.portrait?.imgix_url
    ? `${member.metadata.portrait.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'

  return (
    <div className="card group text-center overflow-hidden">
      {/* Portrait */}
      <div className="p-6 pb-4">
        <div className="relative mx-auto w-32 h-32 mb-6">
          <img
            src={imageUrl}
            alt={member.metadata.full_name}
            className="w-full h-full object-cover rounded-full border-4 border-gold-200 group-hover:border-gold-400 transition-colors duration-300"
            width={128}
            height={128}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {member.metadata.full_name}
        </h3>
        
        <p className="text-gold-600 font-medium text-lg mb-4">
          {member.metadata.position}
        </p>
      </div>

      {/* Bio */}
      <div className="px-6 pb-6">
        <p className="text-gray-600 text-sm leading-relaxed">
          {member.metadata.bio}
        </p>
        
        {member.metadata.experience && (
          <div className="mt-4 pt-4 border-t border-cream-200">
            <div className="inline-flex items-center space-x-2 bg-gold-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
              <span className="text-gold-800 text-sm font-medium">
                {member.metadata.experience}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}