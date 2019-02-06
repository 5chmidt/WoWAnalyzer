import React from 'react';
import PropTypes from 'prop-types';

class ItemDamageTaken extends React.PureComponent {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    approximate: PropTypes.bool,
  };
  static contextTypes = {
    parser: PropTypes.object.isRequired,
  };

  render() {
    const { amount, approximate } = this.props;
    const { parser } = this.context;

    return (
      <>
        <img
          src="/img/shield.png"
          alt="Damage Taken"
          className="icon"
        />{' '}
        {approximate && '≈'}{parser.formatItemDamageTaken(amount)}
      </>
    );
  }
}

export default ItemDamageTaken;
