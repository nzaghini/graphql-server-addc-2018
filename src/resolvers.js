import _ from 'lodash'
import MovieService from './dataSource/movieService'

const resolvers = {
    Query: {
        allDirectors () {
            return MovieService.allDirectors()
        },
        allMovies () {
            return MovieService.allMovies()
        },
        directorOf (root, args, context, info) {
            return directorByMovieId(MovieService.allDirectors(), args)
        },
        moviesBy (root, args, context, info) {
            return moviesByDirectorId(MovieService.allMovies(), args)
        }
    },
    Director: {
        movies (root, args, context, info) {
            return moviesByDirectorId(MovieService.allMovies(), { 'directorId': root.id })
        }
    },
    Movie: {
        director (root, args, context, info) {
            return directorByMovieId(MovieService.allDirectors(), { 'movieId': root.id })
        }
    }
}

const moviesByDirectorId = (allMovies, { directorId }) => {
    return _.filter(allMovies, { 'directorId': parseInt(directorId) })
}
const directorByMovieId = (allDirectors, { movieId }) => {
    return _.find(allDirectors, function (d) { return d.movies.includes(parseInt(movieId)) })
}

export default resolvers
