const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const setCart = (arrayCart) => {
  localStorage.setItem('cart', JSON.stringify(arrayCart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const itemInCart = cart.find(({ id }) => id === product.id);
  const newQuantity = (itemInCart ? itemInCart.quantity + 1 : 1);
  if (newQuantity <= (itemInCart || product).available_quantity) {
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }
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
