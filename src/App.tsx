import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Header from 'components/Header'
import PokemonList from 'components/PokemonList'
import MyPokemons from 'components/MyPokemons'

const App: React.FC = () => {
  return (
    <Router>
      <main className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
        <Header />
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/my-pokemon" component={MyPokemons} />
        </Switch>
        <nav
          style={{
            left: '50%',
            bottom: '4%'
          }}
          className="text-center mt-3">
          <Link to="/">
            <button className="bg-red-700 rounded text-white font-bold mr-3 py-2 px-4">
              Pokemon List
            </button>
          </Link>
          <Link className="text-white font-bold" to="/my-pokemon">
            My Pokemons
          </Link>
        </nav>
      </main>
    </Router>
  );
};

export default App
