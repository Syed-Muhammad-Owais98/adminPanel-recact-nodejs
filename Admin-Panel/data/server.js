const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const urlencoded = require("body-parser/lib/types/urlencoded")
const port = 7000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const dbo = require("./conn");
const userModel = require("./model/User");
const paymentModel = require("./model/Payment");
const jwt = require("jsonwebtoken");
const adminModel = require("./model/Admin");

// USER MODEL APIS
app.get("/users", async (req, res) => {
  // const search = req.params.name;
  const user = await userModel.find();
  res.json(user);
});
app.get("/users/sort", async (req, res) => {
  const user1 = await userModel.find().sort({ registration: 1 });
  const user = await userModel.aggregate([
    {
      $group: {
        _id: { $month: "$registration" },
        user: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  res.json(user);
});

app.get("/users/sortchart", async (req, res) => {
  const user1 = await userModel.find().sort({ registration: 1 });
  const user = await userModel.aggregate([
    // { $match: { address: "Jauhar" } },

    {
      $group: {
        _id: {
          month: { $month: "$registration" },
          areas: "$address ",
        },
        userJ: { $sum: { $cond: [{ $eq: ["$address", "Jauhar"] }, 1, 0] } },
        userN: { $sum: { $cond: [{ $eq: ["$address", "Nazimabad"] }, 1, 0] } },
        userG: { $sum: { $cond: [{ $eq: ["$address", "Gulshan"] }, 1, 0] } },
        userO: { $sum: { $cond: [{ $eq: ["$address", "Orangi"] }, 1, 0] } },
        userNN: {
          $sum: { $cond: [{ $eq: ["$address", "North-Nazimabad"] }, 1, 0] },
        },
      },
    },

    {
      $sort: { "_id.month": 1 },
    },
  ]);
  res.json(user);
});

app.get("/users/getyear", async (req, res) => {
  const user = await userModel.aggregate([
    // { $match: { $year: 2019 } },
    {
      $group: {
        _id: {
          year: {
            $year: "$registration",
          },
        },

        users: {
          $sum: 1,
        },
      },
    },
    {
      $sort: { "_id.year": 1 },
    },
  ]);
  const user19 = user[0].users;
  const user20 = user[1].users;
  const users = { user19, user20 };
  res.json(users);
});

//PAYMENT APIS
app.get("/payments", async (req, res) => {
  // const search = req.params.name;
  const user = await paymentModel.find();
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { name, address, registration, age } = req.body;
  const newUser = await userModel.create({
    name,
    address,
    age,
    registration,
  });
  newUser.save();
  res.send("User Created");
});
app.post("/payments", async (req, res) => {
  const { requestId, senderName, recieverName, paymentType, status } = req.body;
  const newPayment = await paymentModel.create({
    requestId,
    senderName,
    recieverName,
    paymentType,
    status,
  });
  newPayment.save();
  res.send("Payment Created");
});

// ADMIN PANEL APIS
app.get("/admins", async (req, res) => {
  // const search = req.params.name;
  const user = await adminModel.find();
  res.json(user);
});

app.post("/admins", async (req, res) => {
  const { firstname, lastname, companyName, emailAddress, password } = req.body;
  try {
    let user = await adminModel.findOne({ emailAddress: emailAddress });
    if (user) {
      return res.status(400).send("That user already exisits!");
    } else {
      const newUser = await adminModel.create({
        firstname,
        lastname,
        companyName,
        emailAddress,
        password,
      });

      newUser.save();
      // res.json(newUser);
      res.send("Admin Created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/admins/login", async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const user = await adminModel.findOne({ emailAddress: emailAddress });
    if (user === null) {
      return res.status(400).send("Cannot find user");
    }
    if (password === user.password) {
      const token = jwt.sign(
        { id: user._id },
        "1e8c13d0bbaed84588dfddbd226cec32e20ebb06e1889a52a96a65d363d9131e3001231b5c84ee73cf45bff4769b6e103faa84588994e0d0960a551779d67b67"
      );
      if (!token) throw Error("Couldnt sign the token");
      res
        .status(200)
        // .json(user)
        // .send("Success")
        .json({
          token: token,
          id: user._id,
          name: user.firstname,
        });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
