// Temporary in-memory cart store (replace with database queries)
const cartItems = [{
  id: 1,
  userId: 1,
  productId: 2,
  quantity: 1
}];

let nextId = 1;

//add items to cart funciton
export const addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  const existingItem = cartItems.find(
    item => item.userId === userId && item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    return res.status(200).json({
      success: true,
      item: existingItem,
    });
  }

  const newItem = {
    id: nextId++,
    userId,
    productId,
    quantity,
  };

  cartItems.push(newItem);

  res.status(201).json({
    success: true,
    item: newItem,
  });
};

//return items from cart function
export const getCart = (req, res) => {
  try {
    const { userId } = req.params;

    const userCart = cartItems.filter(
      item => item.userId === Number(userId)
    );

    res.status(200).json({
      success: true,
      cart: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message
    });
  }
};

//update cart item function
export const updateCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = cartItems.find(
      item => item.id === Number(id)
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    item.quantity = quantity;

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message
    });
  }
};

//delete cart item function
export const removeFromCart = (req, res) => {
  try {
    const { id } = req.params;

    const index = cartItems.findIndex(
      item => item.id === Number(id)
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    const removedItem = cartItems.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      item: removedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
      error: error.message
    });
  }
};
