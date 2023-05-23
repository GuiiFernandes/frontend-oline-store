export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemInCart = cart.find(({ id }) => id === product.id);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};
