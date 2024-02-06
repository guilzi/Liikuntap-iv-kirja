import styles from './ItemForm.module.scss';
import useForm from '../../shared/useform/useform';
import Button from '../../shared/buttons';
import { useNavigate } from 'react-router-dom';

/**
 * @typedef {Object} FormData
 * @property {string} type - Liikuntatyyppi.
 * @property {number} amount - Kaloreiden kulutus (kCal).
 * @property {string} paymentDate - Päivämäärä.
 * @property {string} periodStart - Aloitusaika.
 * @property {string} periodEnd - Lopetusaika.
 * @property {string} info - Lisätietoja.
 * @property {number} distance - Matkan pituus (km).
 * @property {number} heartrate - Keskiverto syke (bpm).
 */

/**
 * Toiminnallinen komponentti lomakkeen renderöimiseksi.
 *
 * @component
 * @param {Object} props - Komponentin ominaisuudet.
 * @param {FormData} props.formData - Lomakkeen alustamiseen käytettävät tiedot.
 * @param {string[]} props.typelist - Lista käytettävissä olevista liikuntatyypeistä.
 * @param {Function} props.onItemSubmit - Kutsufunktio, kun lomake lähetetään.
 * @param {Function} [props.onItemDelete] - Valinnainen kutsufunktio, kun kohde poistetaan.
 * @returns {JSX.Element} JSX-elementti, joka edustaa lomaketta.
 */
function ItemForm(props) {
  const navigate = useNavigate();

  /**
   * Käsittelijä lomakkeen lähettämiselle.
   */
  const submit = () => {
    let storedValues = { ...values };
    storedValues.amount = parseFloat(storedValues.amount);
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID();
    props.onItemSubmit(storedValues);
    navigate(-1);
  };

  /**
   * Lomakkeen alustustila.
   * @type {FormData}
   */
  const initialState = props.formData ? props.formData : {
    type: "",
    amount: 0,
    paymentDate: "",
    periodStart: "",
    periodEnd: "",
    info: "",
    distance: 0,
    heartrate: 0
  };

  /**
   * Lomakkeen käsittely käyttäen räätälöityä koukkua.
   * @type {Object}
   * @property {FormData} values - Nykyiset lomakkeen arvot.
   * @property {Function} handleChange - Käsittelijä syötteen muutoksille.
   * @property {Function} handleSubmit - Käsittelijä lomakkeen lähettämiselle.
   */
  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false);

  /**
   * Käsittelijä peruuta-painikkeen klikkaukselle.
   */
  const handleCancel = () => {
    navigate(-1);
  };

  /**
   * Käsittelijä poista-painikkeen klikkaukselle.
   */
  const handleDelete = () => {
    props.onItemDelete(values.id);
    navigate(-1);
  };

  return (
        // ... JSX renderöinti ...
    <div>
      <div className={styles.itemforminfo}> *  Merkityt ovat pakollisia täyttää.</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
        <div className={styles.itemform_row}>
            <div>
            <label htmlFor='type'>Liikuntatyyppi*</label>
            <select id='type' onChange={handleChange} value={values.type}>
                <option value="">(valitse)</option>
                { props.typelist.map(
                  type => <option key={type}>{type}</option>
                )}
              </select>
              <div className={styles.itemform_row}>
              <div>
              <label htmlFor='paymentDate'>Päivämäärä*</label>
              <input ide='date' name='paymentDate' onChange={handleChange} value={values.paymentDate} />
            </div>
              <div>
              <label htmlFor='periodStart'>Aloitus*</label>
              <input id='time' name='periodStart' onChange={handleChange} value={values.periodStart} />
            </div>
            <div>
              <label htmlFor='periodEnd'>Lopetus*</label>
              <input id='time' name='periodEnd' onChange={handleChange} value={values.periodEnd} />
            </div>
            </div>
            <div className={styles.itemform_row}>
            <div>
              <label htmlFor='amount'>Kaloreiden kulutus (kCal)</label>
              <input id='number' name='amount' step='1.00' onChange={handleChange} value={values.amount} />
            </div>
            <div>
              <label htmlFor='distance'>Matkan pituus (km)</label>
              <input id='number' name='distance' step='0.10' onChange={handleChange} value={values.distance} />
            </div>
            <div>
              <label htmlFor='heartrate'>Keskiverto syke (bpm)</label>
              <input id='number' name='heartrate' step='1.00' onChange={handleChange} value={values.heartrate} />
            </div>
            </div>
            <div className={styles.itemform_row}>
            <div>
            <label htmlFor='info'>Lisätietoja</label>
            <textarea id='info' rows='8' onChange={handleChange} value={values.info} />
            </div>
            </div>
            <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
            <Button primary
                      disabled={values.type &&
                                values.paymentDate &&
                                values.periodStart &&
                                values.periodEnd ? "" : "true"}
                      type='submit'>
                { props.formData ? "TALLENNA" : "LISÄÄ" }
            </Button>
            </div>
          </div>
          </div>
        </div>
        { props.onItemDelete ? 
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
              <div></div>
            </div>
            : null }
        </div>
      </form>
    </div>
  )

}

export default ItemForm