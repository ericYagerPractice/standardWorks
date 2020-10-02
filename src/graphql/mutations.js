/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createAviationEdge = /* GraphQL */ `
  mutation CreateAviationEdge(
    $input: CreateAviationEdgeInput!
    $condition: ModelaviationEdgeConditionInput
  ) {
    createAviationEdge(input: $input, condition: $condition) {
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
export const updateAviationEdge = /* GraphQL */ `
  mutation UpdateAviationEdge(
    $input: UpdateAviationEdgeInput!
    $condition: ModelaviationEdgeConditionInput
  ) {
    updateAviationEdge(input: $input, condition: $condition) {
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
export const deleteAviationEdge = /* GraphQL */ `
  mutation DeleteAviationEdge(
    $input: DeleteAviationEdgeInput!
    $condition: ModelaviationEdgeConditionInput
  ) {
    deleteAviationEdge(input: $input, condition: $condition) {
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
