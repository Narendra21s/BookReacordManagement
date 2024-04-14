const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const port = 8001;

app.use(express.json());

/*
  Routes : /users/:id
  Method : GET
  Description : Get single user
  Access : Public
  Parameters : Id

  */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running ",
    data: "Hello",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  // const id = req.params.id;
  const user = users.find((eachItem, index) => eachItem.id === id);
  console.log(user);
  if (!user) {
    return res.status(404).json({
      success: false,
      data: "User not found !!",
    });
  }
  return res.status(200).json({
    success: true,
    msg: "User found",
    data: user,
  });
});

/*
  Routes : /users
  Method : POST
  Description : Creating a new user
  Access : Public
  Parameters : None

  */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      data: "User with the id Exits",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    msg: "user added successfully",
    data: users,
  });
});

/*
  Routes : /users
  Method : PUT
  Description : Update a user by id
  Access : Public
  Parameters : Id

  */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "user doen not exist !!",
    });
  }

  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(203).json({
    success: true,
    msg: "User Updated",
    data: updateUserData,
  });
});

/*
  Routes : /users
  Method : DELETE
  Description : Delete a user by id
  Access : Public
  Parameters : Id

  */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(204).json({
      success: false,
      msg: "User not found",
    });
  }

  // Need to build logic for delete here...
});

app.get("*", (req, res) => {
  res.status(404).json({
    msg: "This route doesn't exit",
  });
});
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
