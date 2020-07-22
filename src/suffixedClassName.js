const suffixedClassName = (className, suffix) => {
  const classNames = {
    'menu-selector-container': `${className ? `${className}-menu-selector-container` : ''}`,
    'menu-level-options-container': `${className ? `${className}-menu-level-options-container` : ''}`,
    'menu-open': `${className ? `${className}-menu-open` : ''}`,
    'menu-close': `${className ? `${className}-menu-close` : ''}`,
    'options-label': `${className ? `${className}-options-label` : ''}`,
    'options-sub-menu-container': `${className ? `${className}-options-sub-menu-container` : ''}`,
    'arrow-right': `${className ? `${className}-arrow-right` : ''}`,
    'arrow-left': `${className ? `${className}-arrow-left` : ''}`,
  };

  return classNames[suffix];
};

export default suffixedClassName;
