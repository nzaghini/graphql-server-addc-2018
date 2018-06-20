import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `

type Director {
  id: ID
  firstName: String!
  lastName: String!
  movies: [Movie]
}

type Movie {
  id: ID
  title: String!
  year: String!
  director: Director!
}

type Query {
  allDirectors: [Director]
  allMovies: [Movie]
  directorOf(movieId: ID!): Director
  moviesBy(directorId: ID!): [Movie]
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
