import React from 'react';
import ItemForm from '../components/ItemForm';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/ItemForm',
  component: ItemForm,
  argTypes: {
    formData: { control: 'object' },
    typelist: { control: 'array' },
    onItemSubmit: { action: 'onItemSubmit' },
    onItemDelete: { action: 'onItemDelete' },
  },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};

// Kommentti: Alla olevassa komponentissa määritellään, mitkä kentät ovat pakollisia
// Tämä vaikuttaa myös siihen, että "LISÄÄ" tai "TALLENNA" -napin tila päivittyy oikein
const requiredFieldsComment = `
### Pakolliset kentät

- **Liikuntatyyppi (Type):** Valitse tyyppi pudotusvalikosta.
- **Päivämäärä (Date):** Syötä päivämäärä "Päivämäärä" -kenttään.
- **Aloitus (Start):** Syötä aloitusaika "Aloitus" -kenttään.
- **Lopetus (End):** Syötä lopetusaika "Lopetus" -kenttään.

*Huomio: Tiedot näistä kentistä ovat pakollisia ennen kuin voit lisätä kohteen.*
`;

const Template = (args) => (
  <>
    {/* Include the requiredFieldsComment above the ItemForm component */}
    <div style={{ marginBottom: '20px' }}>{requiredFieldsComment}</div>

    {/* Render the ItemForm component */}
    <ItemForm {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  formData: null,
  typelist: ['Juoksu', 'Uinti', 'Kuntosali'],
  onItemSubmit: (data) => console.log('Lisätty:', data),
  onItemDelete: (id) => console.log('Poistettu:', id),
};