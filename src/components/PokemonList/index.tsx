import React from "react"
import { usePokemonList } from "../../hooks/pokemonlist"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Pagination from "react-bootstrap/Pagination"
import Pokemon from "../Pokemon"

const PokemonList = () => {
  const { isLoading, resolvedData } = usePokemonList()

  if (isLoading) return null

  const { results, count } = resolvedData.data

  return (
    <Container fluid>
      <h1 className="text-center">Pokemon</h1>
      <Row style={{ listStyleType: "none" }}>
        {results.map((pokemon) => (
          <Col key={pokemon.url} xs={3} style={{ marginBottom: 16 }}>
            <Pokemon {...pokemon} />
          </Col>
        ))}
      </Row>
      <Pagination></Pagination>
    </Container>
  )
}

export default PokemonList
