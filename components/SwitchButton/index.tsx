import React from 'react'

import SwitchIcon from 'assets/svg/switch'

type Props = {
  onClick: () => void
}

const SwitchButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: '50%'
      }}
      onClick={onClick}
    >
      <SwitchIcon
        className="w-8 h-8 text-white"
      />
    </div>
  )
}

export default SwitchButton