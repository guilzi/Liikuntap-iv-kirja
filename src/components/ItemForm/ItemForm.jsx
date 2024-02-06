import styles from './ItemForm.module.scss';
import useForm from '../../shared/useform/useform';
import Button from '../../shared/buttons';
import { useNavigate } from 'react-router-dom';

function ItemForm(props) {
  const navigate = useNavigate();

  const submit = () => {
    let storedValues = { ...values };
    storedValues.amount = parseFloat(storedValues.amount);
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID();
    props.onItemSubmit(storedValues);
    navigate(-1);
  };

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

  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    props.onItemDelete(values.id);
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.itemforminfo}> *  Merkityt ovat pakollisia täyttää.</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='type'>Liikuntatyyppi*</label>
              <select type='type' onChange={handleChange} value={values.type}>
                <option value="">(valitse)</option>
                { props.typelist.map(
                  type => <option key={type}>{type}</option> 
                )}
              </select>
              <div className={styles.itemform_row}>
                <div>
                  <label htmlFor='paymentDate'>Päivämäärä*</label>
                  <input type='date' name='paymentDate' onChange={handleChange} value={values.paymentDate} />
                </div>
                <div>
                  <label htmlFor='periodStart'>Aloitus*</label>
                  <input type='time' name='periodStart' onChange={handleChange} value={values.periodStart} />
                </div>
                <div>
                  <label htmlFor='periodEnd'>Lopetus*</label>
                  <input type='time' name='periodEnd' onChange={handleChange} value={values.periodEnd} />
                </div>
              </div>
              <div className={styles.itemform_row}>
                <div>
                  <label htmlFor='amount'>Kaloreiden kulutus (kCal)</label>
                  <input type='number' name='amount' step='1.00' onChange={handleChange} value={values.amount} />
                </div>
                <div>
                  <label htmlFor='distance'>Matkan pituus (km)</label>
                  <input type='number' name='distance' step='0.10' onChange={handleChange} value={values.distance} />
                </div>
                <div>
                  <label htmlFor='heartrate'>Keskiverto syke (bpm)</label>
                  <input type='number' name='heartrate' step='1.00' onChange={handleChange} value={values.heartrate} />
                </div>
              </div>
              <div className={styles.itemform_row}>
                <div>
                  <label htmlFor='info'>Lisätietoja</label>
                  <textarea type='info' rows='8' onChange={handleChange} value={values.info} />
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
        </div>
        { props.onItemDelete ? 
          <div className={styles.itemform_row}>
            <div>
              <Button secondary onClick={handleDelete}>POISTA</Button>
            </div>
            <div></div>
          </div>
          : null }
      </form>
    </div>
  )
}

export default ItemForm;