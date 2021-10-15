import React from 'react';
import { Story } from '@storybook/react';
import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import DatePicker from './DatePicker';
import { DatePickerArgs, InitDatePickerSize } from './DatePickerTypes';

export default {
  title: `${MAINTITLE}/${SUBTITLE.ATOMS}/DatePicker`,
  component: DatePicker,
  parameter: {
    componentSubtitle: 'DatePicker 컴포넌트',
  },
  argTypes: {
    size: {
      options: Object.values(InitDatePickerSize).map((size: string) => size),
      control: {
        type: 'radio',
      },
    },
  },
};

const DatePickerTemplate = (args: DatePickerArgs): JSX.Element => {
  return <DatePicker {...args} />;
};

export const PrimaryDatePicker: Story<DatePickerArgs> = DatePickerTemplate.bind({});
PrimaryDatePicker.args = {
  disabled: false,
  size: InitDatePickerSize.MEDIUM,
  isReadOnly: false,
  placeholder: 'place holder',
};
