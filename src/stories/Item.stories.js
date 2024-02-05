import React from 'react';
import Item from '../components/Item';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    data: { control: 'object' },
  },
};

const Template = ({ data }) => (
  <Item
    data={data}
    // other props as needed
  />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    id: "1",
    type: "Juoksu",
    amount: 555,
    paymentDate: "2024-01-20",
    periodStart: "12:30",
    periodEnd: "13:30",
    distance: "10",
    heartrate: "92",
    info: "Lisätietoa",
  },
};

export const OnlyRequiredData = Template.bind({});
OnlyRequiredData.args = {
  data: {
    id: "2",
    type: "Uinti",
    amount: 123,
    paymentDate: "2024-01-18",
    periodStart: "12:30",
    periodEnd: "13:30",
    info: "Pari kierrosta uintia",
  },
};