import React from 'react'

// import LogoSvgComponent from 'assets/svg/logo'
import PokemonLogo from 'assets/svg/Pokemon.svg'

const Header = () => {
  return (
    <nav className="mb-3 bg-darkPurple w-full flex justify-center items-center shadow-xl box-border">
      {/* <LogoSvgComponent height="80px" /> */}
      <img style={{height:'100px'}} src={PokemonLogo} alt="Logo"/>
      {/* <PokemonLogo /> */}
    </nav>
  )
}

export default Header