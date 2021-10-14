import React from 'react';
import { InitButtonType, ButtonCustomSize } from './ButtonTypes';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

export interface Props {
  type?: string;
  label?: string;
  disabled?: boolean;
  customSize?: ButtonCustomSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

Button.defualtProps = {
  type: InitButtonType.PRIMARY,
  label: 'label',
  disabled: false,
  customSize: undefined,
  onClick: undefined,
};

function Button({ label, type, disabled, customSize, onClick }: Props): JSX.Element {
  return (
    <button className={cx('button', disabled || type)} onClick={onClick} style={customSize} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
