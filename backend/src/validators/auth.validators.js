import { body, validationResult } from "express-validator"


export const registerValidator = [
    body('email')
        .exists().withMessage("Email is requried").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email adress"),
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be string")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name must be 2 to 50 character "),

    body('password')
        .exists().withMessage("Password is requried").bail()
        .isString().withMessage("password must be string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password mus be minimum 6 character long"),

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


export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isString().withMessage("Email must be a string value").bail()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("password is required").bail()
        .trim()
        .isString().withMessage("password must be a string value").bail()
        .isLength({ min: 6 }).withMessage("Password at least 6 character long"),


    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()

            })
        }
        next()
    }

]