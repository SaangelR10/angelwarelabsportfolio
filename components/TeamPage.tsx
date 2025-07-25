'use client'

import Team from './Team'

interface TeamPageProps {
  isVisible: boolean
  onClose: () => void
}

const TeamPage = ({ isVisible, onClose }: TeamPageProps) => {
  return (
    <div className="h-full">
      <Team isStandalone={true} />
    </div>
  )
}

export default TeamPage