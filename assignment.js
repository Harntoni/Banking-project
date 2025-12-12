import express from 'express';
import {Router} from 'express';
import { config } from './src/config/env.js';
import { addProducts } from './src/validator/products.js';

const assignment = express();
assignment.use(express.json())
const router = Router();
assignment.use(router);

          //to create server

assignment.listen(config.port, () => {
    console.log(`server running already on http://localhost:${config.port}`)
});

          //create homepage endpoint

router.get('/', (req, res) => {
    res.send("Hi there, what's your name?")
});

          //adding products manually

const products =[
    {
        
  "name": "Laptop",
  "id": 2,
  "price": 2500000,
  "category": "Electronics"
},
{
  "name": "spoon",
  "id": 4,
  "price": 2500,
  "category": "Kitchen Utensils"
},
{
    "id": 6,
    "name": "Rolex",
    "price": 450000,
    "category": "Wristwatches"
}
];


        //creating endpoint to view products

router.get('/products', (req, res) => {
  res.send(products)});


            //creating endpoint to add products

  router.post('/products/add', async (req, res) => {
    const {error, value} = addProducts.validate(req.body);

    //throw error if field is not filled
    if(error) return res.status(400).json({error: error.message});

   //deconstruct user data into variable "value"
    const {id, name, price, category } = value;

     //check if product name exists
    const productExists= products.find((product) => product.name == value.name);

    //throw an error if product exists
    if(productExists) return res.status(400).json({error: "product added already!"});

    products.push(value);
    return res.send("product added successfully")
});


        //creating endpoint to delete product from product


router.delete('/products/:id', (req, res) => {

  //grab name from params
  const id = req.params.id;
  // console.log(id)

  //check if product with id exist
  const productFound = products.find((exists) => exists.id == parseInt(id));
  
  

  //throw error if product does not exist
  if(!productFound) return res.status(404).json({error: "product with id not found"});

  //delete product
  const productsLeft = products.filter((product) => product.id !== parseInt(id));

  //return products left
  return res.status(201).json({message: `product deleted successfully: `, productsLeft});
});



              //creating endpoint to patch products
  router.patch('/products/:id', (req, res) => {

    //extract id from query params
    const id = req.params.id;

    //check if product with id exists
    const productAvaliable = products.find((product) => product.id == id);


    if(!productAvaliable) return res.status(404).json({error: `product not found with id ${id}`});

    //edit product attribute
    Object.assign(productAvaliable, req.body);

    return res.json({message: "product updated successfully", products})
  })
