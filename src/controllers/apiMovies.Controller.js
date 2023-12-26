const createHttpError = require("http-errors");
const {
  getAllMovies,
  storeMovie,
  getMovieById,
  updateMovie,
  deleteMovie
} = require("../services/movies.services");
const paginate = require("express-paginate");
module.exports = {
  index: async (req, res) => {
    try {
      const { movies, count } = await getAllMovies(req.query.limit, req.skip);
      const pagesCount = Math.ceil(count / req.query.limit);
      const currentPage = req.query.page;
      const pages = paginate.getArrayPages(req)(
        pagesCount,
        pagesCount,
        currentPage
      );
      return res.status(200).json({
        ok: true,
        meta: {
          pagesCount,
          currentPage,
          pages
        },
        data: movies.map(movie => {
          return {
            ...movie.dataValues,
            url: `${req.protocol}://${req.get(
              "host"
            )}/api/v1/movies/${movie.id}`
          };
        })
      });
    } catch (error) {
      // console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :("
      });
    }
  },
  show: async (req, res) => {
    try {
      const movie = await getMovieById(req.params.id);
      return res.status(200).json({
        ok: true,
        data: movie
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Error en el servicio."
      });
    }
  },
  store: async (req, res) => {
    try {
      const {
        title,
        rating,
        release_date,
        awards,
        length,
        genre_id,
        actors
      } = req.body;

      if ([title, release_date, awards, rating].includes("" || undefined)) {
        throw createHttpError(400, "Todos los campos son obligatorios");
      }

      const movie = await storeMovie(req.body, actors);
      return res.status(200).json({
        ok: true,
        message: "Pelicula agregada con exito",
        url: `${req.protocol}://${req.get("host")}/api/v1/movies/${movie.id}`
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :-("
      });
    }
  },
  update: async (req, res) => {
    try {
      const movieUpdated = await updateMovie(req.params.id, req.body);
      return res.status(200).json({
        ok: true,
        message: "Pelicula actualizada con exito",
        data: movieUpdated
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :-("
      });
    }
  },
  delete: async (req, res) => {
    try {
      await deleteMovie(req.params.id);
      return res.status(200).json({
        ok: true,
        message: "Pelicula eliminada con exito"
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :-("
      });
    }
  }
};
