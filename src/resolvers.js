import _ from 'lodash'

const resolvers = {
    Query: {
        allDirectors (root, args, ctx, info) {
            return ctx.movieService.allDirectors()
        },
        allMovies (root, args, ctx, info) {
            return ctx.movieService.allMovies()
        },
        directorOf (root, args, ctx, info) {
            return directorByMovieId(ctx.movieService.allDirectors(), args)
        },
        moviesBy (root, args, ctx, info) {
            return moviesByDirectorId(ctx.movieService.allMovies(), args)
        }
    },
    Director: {
        movies (root, args, ctx, info) {
            return moviesByDirectorId(ctx.movieService.allMovies(), { 'directorId': root.id })
        }
    },
    Movie: {
        director (root, args, ctx, info) {
            return directorByMovieId(ctx.movieService.allDirectors(), { 'movieId': root.id })
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
