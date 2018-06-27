import _ from 'lodash'

// ********* DUMMY DATA SOURCE *********  //

const directors = [
    {id: 1, firstName: 'Christopher', lastName: 'Nolan', movies: [1, 3]},
    {id: 2, firstName: 'George', lastName: 'Miller', movies: [2]}]
const movies = [
    {id: 1, title: 'Interstellar', year: 2014, directorId: 1},
    {id: 2, title: 'Mad Max: Fury Road', year: 2015, directorId: 2},
    {id: 3, title: 'Memento', year: 2000, directorId: 1}]

const allDirectors = () => directors
const allMovies = () => movies

module.exports = { allDirectors, allMovies }
