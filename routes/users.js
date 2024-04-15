const express = require("express");
const { users } = require("../data/users.json");
const { route } = require("./books");
const router = express.Router();

// http:localhost:8001/users/
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

router.get("/:id", (req, res) => {
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
  Routes : /
  Method : POST
  Description : Creating a new user
  Access : Public
  Parameters : None

  */

router.post("/", (req, res) => {
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
  Routes : /:id
  Method : PUT
  Description : Update a user by id
  Access : Public
  Parameters : Id

  */

router.put("/:id", (req, res) => {
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
  Routes : /:id
  Method : DELETE
  Description : Delete a user by id
  Access : Public
  Parameters : Id

  */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }

  // Need to build logic for delete here...
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    msg: "deleted user",
    data: users,
  });
});

/*
 Routes : /users/subscription-details/:id
  Method : GET
  Description : Get all user Subscription Details
  Access : Public
  Parameters : Id
  */

router.get("/users/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each = each.id === id));
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User with the id not found",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }

    // 150min => 150 / 60 hr
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    if (user.subscriptionType == "Basic") {
      date = date + 90;
    }
    if (user.subscriptionType == "Standard") {
      date = date + 180;
    }
    if (user.subscriptionType == "Premium") {
      date = date + 365;
    }
    return date;
  };
});

module.exports = router;
