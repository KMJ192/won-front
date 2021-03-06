import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import DatePicker from './DatePicker';
import {
  DatePickerArgs,
  DatePickerCalendarCellPropItem,
  InitDatePickerSize,
  InitDatePickerStatus,
} from './DatePickerTypes';
import DatePickerCalendarCell from './DatePickerCalendar/DatePickerCalendarCell';

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
    status: {
      options: Object.values(InitDatePickerStatus).map((status: string) => status),
      control: {
        type: 'select',
      },
    },
  },
};

const DatePickerTemplate = (args: DatePickerArgs): JSX.Element => {
  const [date, setDate] = useState<string>();
  return (
    <DatePicker
      {...args}
      cellRender={(d: any, propItem: DatePickerCalendarCellPropItem) => {
        return <DatePickerCalendarCell day={d} propItem={propItem} />;
      }}
    />
  );
};

export const PrimaryDatePicker: Story<DatePickerArgs> = DatePickerTemplate.bind({});
PrimaryDatePicker.args = {
  disabled: false,
  size: InitDatePickerSize.MEDIUM,
  isReadOnly: false,
  placeholder: 'placeholder',
};
