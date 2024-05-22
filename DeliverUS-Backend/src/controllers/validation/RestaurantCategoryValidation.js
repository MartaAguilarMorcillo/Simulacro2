import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

// SOLUCIÓN
const checkNameAlreadyExists = async (categoryValue) => {
  try {
    const category = await RestaurantCategory.findAll({ where: { name: categoryValue } })
    if (category.length !== 0) {
      return Promise.reject(new Error(`The category ${categoryValue} already exists`))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check('name').custom((value, { req }) => {
    return checkNameAlreadyExists(value)
  }).withMessage('That category already exists')
]

export { create }
