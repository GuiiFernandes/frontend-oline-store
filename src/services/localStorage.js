const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const setCart = (arrayCart) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const itemInCart = cart.find(({ id }) => id === product.id);
  const maxQtd = (itemInCart || product).available_quantity;
  const newQuantity = (itemInCart ? itemInCart.quantity + quantity : quantity);
  const condition = newQuantity <= maxQtd;
  const validQtd = condition ? newQuantity : maxQtd;
  if (itemInCart) {
    itemInCart.quantity = validQtd;
  } else {
    cart.push({
      ...product,
      quantity,
    });
  }
  setCart(cart);
};

export const changeQuantity = (product, qtd) => {
  const cart = getCart();
  const productChangeQtd = cart.find(({ id }) => id === product.id);
  productChangeQtd.quantity = qtd;
  setCart(cart);
  return cart;
};

export const removeProduct = (product, productsInCart) => {
  const newProductsInCart = productsInCart.filter(({ id }) => id !== product.id);
  setCart(newProductsInCart);
  return newProductsInCart;
};
