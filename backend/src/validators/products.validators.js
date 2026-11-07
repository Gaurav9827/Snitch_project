import { body, validationResult } from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title length must be between 2 to 100 character")
        .isAlpha("en-US", { ignore: " " }).withMessage("Title can only have english small case and capital case "),
    body("discription")
        .exists().withMessage("Discription is required").bail()
        .isString().withMessage("Discription must be a string").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Discription length mudt be between 20 to 500 character"),
    body("price.amount")
        .exists().withMessage("Price amount  is required").bail()
        .isFloat({ min: 0 }).withMessage("Price amount  must be a flaoting number and must be grater than 0").bail(),
    body("price.currency")
        .exists().withMessage("currency is required").bail()
        .isString().withMessage("currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("currency must be INR or USD"),

    body("sizes")
        .exists().withMessage("Size are required").bail()
        .isArray().withMessage("Sizes must be an array of object"),
    body("sizes.*.size")
        .exists().withMessage("Sizes must be present ina ever entry of size array").bail()
        .isString().withMessage("sizes must be a string").bail()
        .isIn(["XS", "s", "M", "L", "XL", "XXL"]).withMessage("sizes can be ...."),
    body("sizes.*.stock")
        .exists().withMessage("stock must be present in every entry of the sizes of array").bail()
        .isInt({ min: 0 }).withMessage("Stock must be integer value"),




    (req, res, next) => {
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