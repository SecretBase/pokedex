import React, { useMemo, Suspense } from "react"
import { lazy } from "@loadable/component"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"

import Spinner from "react-bootstrap/Spinner"

const LazyPokemonList = lazy(() => import("./components/PokemonList"))

export const App = () => {
  const queryConfig = useMemo<ReactQueryProviderConfig>(
    () => ({
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      },
    }),
    []
  )
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Suspense fallback={<Spinner animation="grow" variant="danger" />}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/pokemon" />} />
            <Route path="/pokemon" component={LazyPokemonList} />
          </Switch>
        </Router>
      </Suspense>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      <footer className="text-center">
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </footer>
    </ReactQueryConfigProvider>
  )
}
