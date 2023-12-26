const express = require("express");
const app = express();
const methodOverride = require("method-override");
const paginate = require("express-paginate");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(paginate.middleware(8, 50));

app.use(methodOverride("_method"));

app.use("/api/v1/movies", require("./routes/v1/movies.routes"));
app.use("/api/v1/genres", require("./routes/v1/genres.routes"));


app.listen("3001", () => console.log("Servidor corriendo en el puerto 3001"));
