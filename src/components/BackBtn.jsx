import { Component } from 'react';
import { IoArrowUndo } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default class BackBtn extends Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    return (
      <nav className="back-container">
        <button className="back-button" onClick={ this.goBack }>
          <IoArrowUndo size="19px" />
          Voltar
        </button>
      </nav>
    );
  }
}

BackBtn.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
