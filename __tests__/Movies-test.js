import fs from 'fs'
import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools'
import { graphql } from 'graphql'
import resolvers from '../src/resolvers'
import mockMovieService from './mocks/mockMovieService'

const allMoviesTestCase = {
    id: 'All Movies and Related Directors Test Case',
    query: `
      query {
        allMovies {
           id 
           title
           year
           director{
                firstName
                lastName
           }
        }
      }
    `,
    variables: { },

    // Injecting the mock movie server with canned responses
    context: { movieService: mockMovieService },

    // Expected result
    expected: { data: { allMovies: [
        {id: '1', title: 'Interstellar', year: '2014', director: { firstName: 'Christopher', lastName: 'Nolan' }},
        {id: '2', title: 'Mad Max: Fury Road', year: '2015', director: { firstName: 'George', lastName: 'Miller' }}] } }
}

describe('Schema', () => {
    // Array of case types
    const cases = [allMoviesTestCase]
    const typeDefs = fs.readFileSync('./src/schemas/Movie.graphql', 'utf8')
    const mockSchema = makeExecutableSchema({ typeDefs, resolvers })

    // Here we specify the return payloads of mocked types
    addMockFunctionsToSchema({
        schema: mockSchema,
        mocks: {
            Movie: () => ({
                id: 1,
                title: 'Interstellar',
                year: 2014
            }),
            Director: () => ({
                id: 1,
                firstName: 'Christopher',
                lastName: 'Nolan'
            })
        },
        preserveResolvers: true
    })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj
        test(`query: ${id}`, async () => {
            const result = await graphql(mockSchema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})
