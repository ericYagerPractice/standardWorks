/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      anotherOne
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        anotherOne
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAviationEdge = /* GraphQL */ `
  query GetAviationEdge($id: ID!) {
    getAviationEdge(id: $id) {
      id
      ACiataCode
      ACicaoCode
      ACtaileNumbe
      ARicaoCode
      DEPicaoCode
      FlightNumber
      FlightAltitude
      FlightDirection
      FlightLatitude
      FlightLongitude
      FlightSpeed
      FlightStatus
      UpdateTime
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAviationEdges = /* GraphQL */ `
  query ListAviationEdges(
    $filter: ModelaviationEdgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAviationEdges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ACiataCode
        ACicaoCode
        ACtaileNumbe
        ARicaoCode
        DEPicaoCode
        FlightNumber
        FlightAltitude
        FlightDirection
        FlightLatitude
        FlightLongitude
        FlightSpeed
        FlightStatus
        UpdateTime
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
