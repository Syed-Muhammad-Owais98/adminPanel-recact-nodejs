const mongoose = require("mongoose");
const Db =
  "mongodb+srv://Syed_Muhammad_Owais:syedmuhammadowais@cluster0.roii4.mongodb.net/project?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
};
const connection = mongoose
  .connect(Db, connectionParams)
  .then(() => console.log("Connected"))
  .catch((error) => console.log(error));

module.exports = connection;
