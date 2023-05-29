import PropTypes from 'prop-types';
import { Component } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { NumericFormat } from 'react-number-format';
import '../css/ProductCart.css';

export default class ProductCart extends Component {
  render() {
    const { product, handleRemoveProduct, handleChangeQuantity, quantities } = this.props;
    const { id, quantity, title, thumbnail,
      price, available_quantity: availableQuantity } = product;
    const negativeMult = -1;
    return (
      <div className="product-cart">
        <button
          className="btn-cart remove-product-cart"
          data-testid="remove-product"
          onClick={ () => handleRemoveProduct(product) }
        >
          X
        </button>
        <img
          className="img-product-cart"
          src={ thumbnail }
          alt={ title }
        />
        <p
          className="product-title"
          data-testid="shopping-cart-product-name"
        >
          { title }
        </p>
        <div className="purchase-container">
          <div
            className="qtd-container"
            data-testid="shopping-cart-product-quantity"
          >
            <button
              className="btn-cart qtd"
              data-testid="product-decrease-quantity"
              onClick={ () => handleChangeQuantity(product, negativeMult, 1, false) }
              disabled={ quantity === 1 }
            >
              <IoIosArrowBack size="20px" />
            </button>
            <input
              type="number"
              className="product-qtd"
              min="1"
              max={ availableQuantity }
              step="1"
              name={ id }
              value={ quantities[id] }
              onChange={ (e) => handleChangeQuantity(product, 1, e.target.value, true) }
            />
            <button
              className="btn-cart qtd"
              data-testid="product-increase-quantity"
              onClick={ () => handleChangeQuantity(product, 1, 1, false) }
              disabled={ quantity === availableQuantity }
            >
              <IoIosArrowForward size="20px" />
            </button>
          </div>
          <p className="price-cart">
            <NumericFormat
              value={ price }
              allowNegative={ false }
              displayType="text"
              decimalScale={ 2 }
              fixedDecimalScale
              decimalSeparator=","
              prefix="R$"
              thousandSeparator="."
            />
          </p>
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    available_quantity: PropTypes.number.isRequired,
  }).isRequired,
  quantities: PropTypes.objectOf(PropTypes.number).isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
  handleRemoveProduct: PropTypes.func.isRequired,
};
