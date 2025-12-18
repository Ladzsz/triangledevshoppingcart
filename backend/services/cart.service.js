//temporary in memory store
let cartItems = []
let nextId = 1

//grab users cart function
export const getCartByUser = (userId) => {
  return cartItems.filter((item) => item.userId === userId)
}

//add to users cart function
export const addToCart = (userId, productId, quantity) => {
  const existingItem = cartItems.find(
    (item) => item.userId === userId && item.productId === productId
  )

  if (existingItem) {
    existingItem.quantity += quantity
    return existingItem
  }

  const newItem = {
    id: nextId++,
    userId,
    productId,
    quantity,
  }

  cartItems.push(newItem)
  return newItem
}

//update users cart function
export const updateCartItem = (userId, itemId, quantity) => {
  const item = cartItems.find((i) => i.id === itemId && i.userId === userId)

  if (!item) {
    throw new Error('Cart item not found')
  }

  item.quantity = quantity
  return item
}

//remove users cart item function
export const removeCartItem = (userId, itemId) => {
  const index = cartItems.findIndex(
    (i) => i.id === itemId && i.userId === userId
  )

  if (index === -1) {
    throw new Error('Cart item not found')
  }

  return cartItems.splice(index, 1)[0]
}

//clear users cart function
export const clearCartByUser = (userId) => {
  cartItems = cartItems.filter((item) => item.userId !== userId)
}
