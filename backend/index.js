const express = require("express");
const cors = require("cors"); //just bug fix
require("./db/config"); //use connection from db/config.js scriot
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp)=>{
    let user = new User(req.body)
    let result = await user.save();
    resp.send(result);
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
