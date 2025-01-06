const express = require("express");
const cors = require("cors"); //just bug fix
require("./db/config"); //use connection from db/config.js scriot
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp)=>{
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject(); //delete password in response
    delete result.password; //delete password in response
    resp.send(result);
})

app.post("/login", async (req, resp) => {
    const { email, password } = req.body; // Extrai apenas os campos necessários do corpo da requisição (JSON FORMAT)

    if (!email || !password) {
        return resp.status(400).send({ result: "Email and password are required" });
    }

    try {
        let user = await User.findOne({ email, password }).select("-password"); // Ignora o campo password na resposta

        if (user) {
            resp.send(user);
        } else {
            resp.status(404).send({ result: "No user found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send({ result: "Internal Server Error" });
    }
});

app.post("/add-product",  async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products",async(req,resp)=>{
    const products = await Product.find();
    if (products.length > 0){
        resp.send(products)
    }
    else{
        resp.send({result:"No Products found"})
    }
})

app.delete("/product/:id", async (req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get("/product/:id", async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if (result) resp.send(result)
    else resp.send({result:"No Record Found"})
})

app.put("/product/:id", async (req,resp)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    resp.send(result)
})

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key, $options: 'i'} // Insensitive a maiúsculas/minúsculas
            },
            {
                brand: { $regex: req.params.key, $options: 'i'}
            },
            {
                category: { $regex: req.params.key, $options: 'i'}
            }
        ]
    });
    resp.send(result);
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
