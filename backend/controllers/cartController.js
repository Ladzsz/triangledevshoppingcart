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