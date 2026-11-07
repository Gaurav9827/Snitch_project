import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addtoCart(req, res) {

    const { productId, quantity, size } = req.body


    const product = await productModel.findById(productId
    )

    if (!product) {

        return res.status(404).jdon({
            message: "product not found "
        })
    }

    const selectedSize = product.sizes.find(s => s.size === size)

    if (!selectedSize) {
        return res.status(400).json({
            message: "Invalid size"
        })
    }

    if (selectedSize.stock < quantity) {
        return res.status(400).json({
            message: "Insufficient stock"
        })
    }


    const cart = (await cartModel.findOne({ user: req.user.userId })) ?? await cartModel.create({ user: req.user.userId })



    const productInCard = cart.products.find(p => p.product.toString() === productId)


    if (productInCard) {

        if ((productInCard.quantity + quantity) > selectedSize.stock) {
            return res.status(400).json({
                message: "Insufficent stock"
            })
        }

        await cartModel.updateOne(
            {
                user: req.user.userId,
                "products.product": productId,
                "products.size": size
            },
            {
                $inc: {
                    "poducts.$.quantity": quantity
                }
            }
        )
        return res.status(200).json({
            message: "Product quantity updated in cart"
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user.userId },
        {
            $push: {
                products: {
                    product: productId,
                    quantity: quantity,
                    size: size
                }
            }
        }
    )
    return res.status(200).json({
        message: "Product added to cart"
    })



} 