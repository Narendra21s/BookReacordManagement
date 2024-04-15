const express = require("express");

const userRouters = require("./routes/users.js");
const bookRouters = require("./routes/books.js");

const app = express();

const port = 8001;

app.use(express.json());

/*
  Routes : /
  Method : GET
  Description : Get single user
  Access : Public
  Parameters : Id

  */
// http://localhostl:8001/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running ",
    data: "Hello",
  });
});

app.use("/users", userRouters);
app.use("/books", bookRouters);

app.get("*", (req, res) => {
  res.status(404).json({
    msg: "This route doesn't exit",
  });
});
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
