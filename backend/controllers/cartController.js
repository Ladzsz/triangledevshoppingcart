import * as cartService from '../services/cart.service.js'

export const getUserCart = (req, res) => {
  const cart = cartService.getCartByUser(req.user.id)
  res.json({ success: true, cart })
}

export const addItemToCart = (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || quantity == null) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const item = cartService.addToCart(req.user.id, productId, quantity)

  res.status(201).json({ success: true, item })
}

export const updateCartItem = (req, res) => {
  const { quantity } = req.body
  const itemId = Number(req.params.id)

  try {
    const item = cartService.updateCartItem(req.user.id, itemId, quantity)
    res.json({ success: true, item })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

export const removeCartItem = (req, res) => {
  const itemId = Number(req.params.id)

  try {
    const item = cartService.removeCartItem(req.user.id, itemId)
    res.json({ success: true, item })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

export const clearUserCart = (req, res) => {
  cartService.clearCartByUser(req.user.id)
  res.json({ success: true, message: 'Cart cleared' })
}
