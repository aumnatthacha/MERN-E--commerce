/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *          type: object
 *          required:
 *            -   name
 *            -   price
 *            -   description
 *            -   image
 *            -   category
 *          properties:
 *            name:
 *                type: string
 *                description:  The name  of  the product
 *            price:
 *                type: number
 *                description:  The price of  the product
 *            description:
 *                type:  string
 *                description:  The description of the product
 *            image:
 *                type: string
 *                description:  The image of  the product
 *            category:
 *                type: string
 *                description:  The category  of  the product
 *          example:
 *                name: "Macbook  Pro"
 *                price:  3000
 *                description:  "A  great laptop"
 *                image:  "http://example.come/macbook.jpg"
 *                category: "Electronics"
 * tags:
 *  name:  Product
 *  description: the products  managing  API
*/
const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model")

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve  a list  of  product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some  error happened
 */



router.get("/" , async (req,res) => {
  try {
    const products = await ProductModel.find();
        res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }  
})
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by  id
 *     tags: [Product]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The product Id
 *     responses:
 *       200:
 *         description: The Product by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.get("/:id", async (req,res) => {
  try {
    const productId = req.params.id
    const products = await ProductModel.findById(productId)
    if (!products) {
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(products)

  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create  new product
 *     tags: [Product]
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The Product by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.post("/", async (req,res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const product = await newProduct.save();
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Product]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The product Id
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The Product by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */
router.put("/:id" , async (req,res) => {
  const {id} = req.params.id
  const newProduct = req.body
  try {
    const products = await ProductModel.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    if (!products) {
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The product Id
 *     responses:
 *       200:
 *         description: The Product is  delete.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.delete("/:id" , async (req,res) => {
  try {
    const products = await ProductModel.findByIdAndDelete(req.params.id)
    if (!products) {
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


module.exports = router