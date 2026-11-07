import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProducts(req, res) {

    console.log(req.body)
    console.log(req.files)

    const filesUrls = []

    for (let i = 0; i < req.files.length; i++) {

        const response = await uploadFile({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })
        console.log(response)


        filesUrls.push(response.url)
    }

    console.log(filesUrls)


    const products = await productModel.create({
        title: req.body.title,
        discription: req.body.discription,
        price: {
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes: req.body.sizes,
        images: filesUrls,
        seller: req.user.userId
    })



    res.status(200).json({
        message: "Product created successfully",
        data: {
            products
        }
    })

}



export async function listAllProduct(req, res) {
    const product = await productModel.find()

    res.status(200).json({
        message: "Product data fetched succefully ",
        data: {
            product
        }
    })
}