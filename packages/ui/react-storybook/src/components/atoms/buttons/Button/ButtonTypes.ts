export interface ButtonTypes {
  PRIMARY: string;
  SECONDARY: string;
}

export interface ButtonCustomSize {
  width?: string;
  height?: string;
}

export const InitButtonType: ButtonTypes = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

export interface ButtonArgs {
  label?: string;
  type?: string;
  customSize?: ButtonCustomSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
