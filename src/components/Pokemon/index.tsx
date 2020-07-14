import React from "react"
import type { PokemonItem } from "../../types/PokemonItem"
import Card from "react-bootstrap/Card"

const Pokemon = (props: PokemonItem) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text className="text-center">{props.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Pokemon
