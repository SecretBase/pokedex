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
import PokemonList from "./components/PokemonList"

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
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              console.log("here")
              return (
                <Redirect to={{ pathname: "/pokemon", search: "?page=1" }} />
              )
            }}
          />
          <Route path="/pokemon" exact component={PokemonList} />
        </Switch>
      </Router>

      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      <footer className="text-center">
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </footer>
    </ReactQueryConfigProvider>
  )
}
