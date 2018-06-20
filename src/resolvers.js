import {
    moviesByDirectorId,
    directorByMovieId,
    directors,
    movies
} from './dataSource/movieService'

const resolvers = {
    Query: {
        allDirectors () {
            return directors
        },
        allMovies () {
            return movies
        },
        directorOf (root, args, context, info) {
            return directorByMovieId(args)
        },
        moviesBy (root, args, context, info) {
            return moviesByDirectorId(args)
        }
    },
    Director: {
        movies (root, args, context, info) {
            return moviesByDirectorId({ 'directorId': root.id })
        }
    },
    Movie: {
        director (root, args, context, info) {
            return directorByMovieId({ 'movieId': root.id })
        }
    }
}

export default resolvers
