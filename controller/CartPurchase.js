import mongoose from 'mongoose'
import CartPurchase from '../model/CartPurchase.js'


// Add course to cart
export const addToCart = async (req, res) => {
  try {
    const { courseId } = req.body
    const cart = await CartPurchase.findOne({ user: req.user._id })
    if (cart) {
      if (cart.courses.includes(courseId)) {
        return res.status(400).json({ msg: 'Course already in cart' })
      }
      cart.courses.push(mongoose.Types.ObjectId(courseId))
      console.log(cart)
      cart.totalCost += courseId.cost
      await cart.save()
      res.json(cart)
    } else {
      const newCartPurchase = new CartPurchase({
        user: req.user.id,
        courses: [mongoose.Types.ObjectId(courseId)],
        // totalCost: courseId.cost,
      })
      // console.log(error.message)
      await newCartPurchase.save()
      res.json(newCartPurchase)
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}


// // Add course to cart
// export const addToCart = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const cart = await CartPurchase.findOne({ user: req.user._id })
//     if (cart) {
//       if (cart.courses.includes(courseId)) {
//         return res.status(400).json({ msg: 'Course already in cart' })
//       }
//       cart.courses.push(mongoose.Types.ObjectId(courseId))
//       cart.totalCost += courseId.cost
//       await cart.save()
//       res.json(cart)
//     } else {
//       const newCartPurchase = new CartPurchase({
//         user: req.user.id,
//         courses: [mongoose.Types.ObjectId(courseId)],
//         // totalCost: courseId.cost,
//       })
//       // console.log(error.message)
//       await newCartPurchase.save()
//       res.json(newCartPurchase)
//     }
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// }

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await CartPurchase.findOne({ user: req.user.id }).populate(
      'courses',
    )
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }
    res.json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Remove course from cart
export const removeFromCart = async (req, res) => {
  try {
    const { courseId } = req.params
    const cart = await CartPurchase.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }
    cart.courses = cart.courses.filter((id) => id !== courseId)
    cart.totalCost -= courseId.cost
    await cart.save()
    res.json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Checkout
export const checkout = async (req, res) => {
  try {
    const cart = await CartPurchase.findOne({ user: req.user.id }).populate(
      'courses',
    )
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    // Calculate total price of courses in cart
    let total = 0
    cart.courses.forEach((course) => {
      total += course.price
    })

    // Create new purchase
    const purchase = new CartPurchase({
      user: req.user.id,
      courses: cart.courses,
      totalPrice: total,
    })
    await purchase.save()
    // Clear cart
    cart.courses = []
    await cart.save()
    // Return success response
    return res
      .status(200)
      .json({ success: true, message: 'Purchase successful' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
