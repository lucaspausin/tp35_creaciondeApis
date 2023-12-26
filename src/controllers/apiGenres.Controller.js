const { getAllGenres, getGenreById } = require("../services/genres.services");
module.exports = {
  index: async (req, res) => {
    try {
      const resultado = await getAllGenres();

      return res.status(200).json({
        ok: true,
        data: resultado
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :("
      });
    }
  },
  show: async (req, res) => {
    try {
      const resultado = await getGenreById(req.params.id);

      return res.status(200).json({
        ok: true,
        data: resultado
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Hubo un error. :("
      });
    }
  }
};
