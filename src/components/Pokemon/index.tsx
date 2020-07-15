import React, { useMemo } from "react"
import type { PokemonItem } from "../../types/PokemonItem"
import Card from "react-bootstrap/Card"
import { usePokemon } from "../../hooks/pokemon"

const Pokemon = (props: PokemonItem) => {
  const { data } = usePokemon(props.name)
  const style = useMemo(
    () =>
      ({
        "--aspect-ratio": "1/1",
      } as React.CSSProperties),
    []
  )

  return (
    <Card>
      <div style={style}>
        <Card.Img variant="top" src={data?.data.sprites?.front_default} />
      </div>
      <Card.Body>
        <Card.Text className="text-center">{props.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Pokemon
