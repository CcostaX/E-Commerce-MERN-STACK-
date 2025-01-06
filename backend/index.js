const express = require("express");
const cors = require("cors"); //just bug fix
require("./db/config"); //use connection from db/config.js scriot
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp)=>{
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject(); //delete password in response
    delete result.password; //delete password in response
    Jwt.sign({result}, jwtKey,{expiresIn:"2h"}, (err,token)=>{
        if (err){
            resp.status(404).send({ result: "Something went wrong, Please try after sometime" });
        }
        resp.send({result, auth:token})
    })
})

app.post("/login", async (req, resp) => {
    const { email, password } = req.body; // Extrai apenas os campos necessários do corpo da requisição (JSON FORMAT)

    if (!email || !password) {
        return resp.status(400).send({ result: "Email and password are required" });
    }

    try {
        let user = await User.findOne({ email, password }).select("-password"); // Ignora o campo password na resposta

        if (user) {
            Jwt.sign({user}, jwtKey,{expiresIn:"2h"}, (err,token)=>{
                if (err){
                    resp.status(404).send({ result: "Something went wrong, Please try after sometime" });
                }
                resp.send({user, auth:token})
            })
        } else {
            resp.status(404).send({ result: "No user found" });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send({ result: "Internal Server Error" });
    }
});

app.post("/add-product", verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products", verifyToken, async(req,resp)=>{
    const products = await Product.find();
    if (products.length > 0){
        resp.send(products)
    }
    else{
        resp.send({result:"No Products found"})
    }
})

app.post("/productss", verifyToken, async (req, resp) => {
    const { userId } = req.body; // Obtém o userId do corpo da requisição

    if (!userId) {
        return resp.status(400).send({ result: "User ID is required" });
    }

    try {
        const products = await Product.find({ userId }); // Filtra os produtos pelo userId
        if (products.length > 0) {
            resp.send(products);
        } else {
            resp.send({ result: "No products found for this user" });
        }
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
        resp.status(500).send({ error: "Erro ao buscar produtos" });
    }
});

app.delete("/product/:id", verifyToken, async (req,resp)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get("/product/:id", verifyToken, async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if (result) resp.send(result)
    else resp.send({result:"No Record Found"})
})

app.put("/product/:id", verifyToken, async (req,resp)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    resp.send(result)
})

app.get("/search/:key", verifyToken, async (req, resp) => {
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

function verifyToken(req,resp,next){
    console.warn(req.headers['authorization'])
    let token = req.headers['authorization'];
    if (token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if (err) resp.status(401).send({result: "Please provide a valid token"})
            else next()
        })
    }
    else{
        resp.status(403).send({result: "Please provide a token"})
    }
}

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
