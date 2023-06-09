import PropTypes from 'prop-types';
import { Component } from 'react';
import { NumericFormat } from 'react-number-format';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { addToCart } from '../services/localStorage';

export default class PurchaseDetail extends Component {
  state = {
    quantity: 1,
  };

  handleAddInCart = (product) => {
    const { quantity } = this.state;
    addToCart(product, quantity);
  };

  handleChangeQuantity = (product, mult, value, fromInput) => {
    const { quantity } = this.state;
    let validValue = fromInput ? (Number(value) || 0) : quantity + (mult * 1);
    validValue = validValue > product.available_quantity
      ? product.available_quantity : validValue;
    this.setState({ quantity: validValue || '' });
  };

  render() {
    const { quantity } = this.state;
    const { product } = this.props;
    const { price, available_quantity: availableQuantity } = product;
    const nMult = -1;
    return (
      <div className="purchase-detail-container">
        <NumericFormat
          className="value-total"
          value={ price }
          allowNegative={ false }
          displayType="text"
          data-testid="product-detail-price"
          decimalScale={ 2 }
          fixedDecimalScale
          decimalSeparator=","
          prefix="R$"
          thousandSeparator="."
        />
        <div className="qtd-detail-container">
          <button
            className="btn-cart qtd"
            data-testid="product-decrease-quantity"
            onClick={ () => this.handleChangeQuantity(product, nMult, 1, false) }
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
            name="quantity"
            value={ quantity }
            onChange={ (e) => (
              this.handleChangeQuantity(product, 1, e.target.value, true)
            ) }
          />
          <button
            className="btn-cart qtd"
            data-testid="product-increase-quantity"
            onClick={ () => this.handleChangeQuantity(product, 1, 1, false) }
            disabled={ quantity === availableQuantity }
          >
            <IoIosArrowForward size="20px" />
          </button>
        </div>
        <button
          className="btn-checkout"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleAddInCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

PurchaseDetail.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};
