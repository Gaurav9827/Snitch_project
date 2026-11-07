import { body, validationResult } from "express-validator"



export const addToCartValidator = [
    body("productId")
        .exists().withMessage("product id is required").bail()
        .isString().withMessage("Product ID must be a string").bail()
        .isMongoId().withMessage("Product Id must be a valid Mongo Id"),

    body("qunatity")
        .exists().withMessage("Quantity is required").bail()
        .isInt({ min: 1 }).withMessage("Quantity must be a integer greater than 0").bail(),

    body("size")
        .exists().withMessage(" Size is required").bail()
        .isString().withMessage("Size must be a string").bail()
        .isInt(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size must be one  XS, S, M, L, XL,XXL"),


    (req, res, next)  => {
 

        const errors = validationResult(req)
        
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        message: "Invalid request",
                        errors: errors.array()
        
                    })
                }
                next()
    }
]

