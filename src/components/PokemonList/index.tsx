import React, { useState, useCallback } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Pagination from "react-bootstrap/Pagination"
import Spinner from "react-bootstrap/Spinner"
import { useLocation, useHistory, Redirect } from "react-router-dom"

import Pokemon from "../Pokemon"
import { usePokemonList } from "../../hooks/pokemonlist"

const PokemonList = () => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [limit] = useState(20)
  const [page, setPage] = useState(
    queryParams.get("page") ? parseInt(queryParams.get("page"), 10) : 1
  )

  const { isFetching, resolvedData, isLoading } = usePokemonList({
    limit,
    page,
  })

  const { results, count } = resolvedData?.data ?? {}

  const totalPage = Math.ceil(count / limit)

  const prev = useCallback(
    (e) => {
      e.preventDefault()
      setPage((currentPage) => currentPage - 1)
      history.push({ pathname: "/pokemon", search: `?page=${page - 1}` })
    },
    [page, history.push]
  )

  const next = useCallback(
    (e) => {
      e.preventDefault()
      setPage((currentPage) => currentPage + 1)
      history.push({ pathname: "/pokemon", search: `?page=${page + 1}` })
    },
    [page, history.push]
  )

  return (
    <Container fluid>
      <h1 className="text-center">Pokemon</h1>
      <Row style={{ listStyleType: "none" }}>
        {results?.map((pokemon) => (
          <Col key={pokemon.url} xs={3} style={{ marginBottom: 16 }}>
            <Pokemon {...pokemon} />
          </Col>
        ))}
      </Row>
      <div
        style={{ height: "2rem" }}
        className="d-flex justify-content-center mb-3"
      >
        {isFetching && <Spinner animation="grow" variant="danger" />}
      </div>
      {!isLoading && (
        <Pagination className="justify-content-center">
          <Pagination.Prev disabled={page === 1 || isFetching} onClick={prev} />
          <Pagination.Item disabled>{page}</Pagination.Item>
          <Pagination.Item disabled>of</Pagination.Item>
          <Pagination.Item disabled>{totalPage}</Pagination.Item>
          <Pagination.Next
            disabled={page === totalPage || isFetching}
            onClick={next}
          />
        </Pagination>
      )}
    </Container>
  )
}

export default PokemonList
