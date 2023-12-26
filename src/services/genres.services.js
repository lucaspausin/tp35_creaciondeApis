const db = require("../database/models");

const getAllGenres = async () => {
  try {
    const genres = await db.Genre.findAll({
      attributes: ["id", "name", "ranking", "active"]
    });
    console.log(genres);
    if (!genres) {
      throw {
        status: 404,
        message: "No existen generos"
      };
    }
    return genres;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

const getGenreById = async id => {
  try {
    if (!id) {
      throw {
        status: 400,
        message: "Id inexistente"
      };
    }
    const genre = await db.Genre.findByPk(id, {
      attributes: ["id", "name", "ranking", "active"]
    });
    if (!genre) {
      throw {
        status: 404,
        message: "no hay un genero con ese id"
      };
    }
    return genre;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};
module.exports = {
  getAllGenres,
  getGenreById
};
