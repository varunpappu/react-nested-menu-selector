import * as React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import suffixedClassName from './suffixedClassName';
import './style.scss';

class DropDownMenuSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = (value) => {
    const { handleOnClick } = this.props;
    handleOnClick(value);
  };

  handleClickOutside = () => {
    const { isMenuOpen } = this.state;

    return isMenuOpen && this.setState({ isMenuOpen: false });
  };

  getClassName = (suffix) => {
    const { className } = this.props;

    return suffixedClassName(className, suffix);
  };

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  };

  renderPlaceholder = placeholder => <div>{placeholder || 'Menu Name'}</div>;

  renderOptionsMenu = options => options.map((item, i) => {
    if (!item.hidden) {
      if (item.options && item.options.length) {
        return (
          <div key={`${item.label}-${i}`} className="options-container">
            {item.logo ? (
              <img
                alt=""
                src={item.logo}
                style={{ width: '10%', marginRight: '10px' }}
              />
            ) : null}
            <div
              className={`options-label ${this.getClassName(
                'options-label',
              )}`}
            >
              {item.label}
            </div>
            {this.renderSubMenu(item)}
          </div>
        );
      }

      return (
        <React.Fragment key={`${item.label}-${i}`}>
          {this.renderSubMenu(item)}
        </React.Fragment>
      );
    }
    return null;
  });

  renderSubMenu = (item) => {
    if (!item.hidden) {
      if (item.options && item.options.length) {
        return (
          <>
            <div
              className={`arrow-right ${this.getClassName('arrow-right')}`}
            />
            <div
              className={`options-sub-menu-container ${this.getClassName(
                'options-sub-menu-container',
              )}`}
            >
              {this.renderOptionsMenu(item.options)}
            </div>
          </>
        );
      }

      return (
        <div
          className="options-container"
          onClick={() => this.handleOnClick(item.value)}
        >
          {item.logo ? (
            <img
              alt=""
              src={item.logo}
              style={{ width: '10%', marginRight: '10px' }}
            />
          ) : null}
          <div
            className={`options-label ${this.getClassName('options-label')}`}
          >
            {item.label}
          </div>
          <span>&#8629;</span>
        </div>
      );
    }
    return null;
  };

  render() {
    const { isMenuOpen } = this.state;
    const { values } = this.props;
    return (
      <div className="root-menu-container">
        <div className="menu-selector" onClick={this.toggleMenu}>
          {this.renderPlaceholder(values.placeholder)}
        </div>
        <div
          className={`menu-level-options-container ${this.getClassName(
            'menu-level-options-container',
          )} ${
            isMenuOpen
              ? `menu-open ${this.getClassName('menu-open')}`
              : `menu-close ${this.getClassName('menu-close')}`
          }`}
        >
          <div className="options-main-menu">
            {this.renderOptionsMenu(values.options)}
          </div>
        </div>
      </div>
    );
  }
}

DropDownMenuSelect.propTypes = {
  handleOnClick: PropTypes.func,
  className: PropTypes.string,
  values: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
      logo: PropTypes.string,
    })),
  }),
};

DropDownMenuSelect.defaultProps = {
  values: {
    placeholder: '',
    options: [],
  },
  handleOnClick: () => { },
  className: '',
};


export default onClickOutside(DropDownMenuSelect);
