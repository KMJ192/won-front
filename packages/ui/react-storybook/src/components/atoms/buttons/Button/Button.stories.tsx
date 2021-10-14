import React, { useState } from 'react';
import { Story } from '@storybook/react';

import Button from './Button';
import { ButtonArgs, InitButtonType } from './ButtonTypes';

export default {
  title: 'STORY BOOK/Atoms/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'Button',
  },
  argTypes: {
    type: {
      options: Object.values(InitButtonType).map((type: string) => type),
      control: { type: 'select' },
    },
    onClick: { action: '클릭' },
  },
};

const ButtonTemplate = (args: ButtonArgs): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (args.onClick) args.onClick(e);
    setToggle((toggle: boolean) => !toggle);
  };

  return <Button {...args} onClick={onClick} />;
};

export const Primary: Story<ButtonArgs> = ButtonTemplate.bind({});
Primary.args = {
  type: InitButtonType.PRIMARY,
  label: 'label',
  customSize: {},
};

export const Secondary: Story<ButtonArgs> = ButtonTemplate.bind({});
Secondary.args = {
  type: InitButtonType.SECONDARY,
  label: 'label',
  customSize: {},
};
