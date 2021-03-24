import React from 'react'

import PokemonLogo from 'assets/svg/Pokemon.svg'

const Header = () => {
  return (
    <nav className="mb-3 bg-darkPurple w-full flex justify-center items-center shadow-xl box-border">
      <img style={{height:'100px'}} src={PokemonLogo} alt="Logo"/>
    </nav>
  )
}

export default Header