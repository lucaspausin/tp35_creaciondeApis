const router = require("express").Router();
const { index, show } = require("../../controllers/apiGenres.Controller");

router.get("/", index).get("/detail/:id", show);

module.exports = router;
