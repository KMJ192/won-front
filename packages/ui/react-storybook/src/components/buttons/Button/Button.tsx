import React from 'react';

import classNames from 'classnames';
import styles from './Button.module.scss';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  theme?: ButtonType;
}

Button.defualtProps = {
  theme: ButtonType.PRIMARY,
};

function Button({ children, theme = ButtonType.PRIMARY }: Props): JSX.Element {
  const classNameProps = classNames(styles.default, styles[theme]);
  return <button className={classNameProps}>{children}</button>;
}

export default Button;
