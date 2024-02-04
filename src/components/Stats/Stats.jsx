import styles from './Stats.module.scss';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { LabelList, Legend } from 'recharts';
import randomColor from 'randomcolor';

function Stats(props) {
  const locale = "fi-FI";
  const numberFormat = new Intl.NumberFormat(locale);

  const datereducer = (resultData, item) => {
    const index = resultData.findIndex(arrayItem => arrayItem.paymentDate === item.paymentDate);
    if (index >= 0) {
      resultData[index].amount = resultData[index].amount + parseFloat(item.amount);
    } else {
      resultData.push({ paymentDate: item.paymentDate, amount: parseFloat(item.amount) });
    }
    return resultData;
  };

  let linedata = props.data.reduce(datereducer, []);

  linedata = linedata.map(
    (item) => ({
      date: new Date(item.paymentDate).getTime(),
      amount: item.amount
    })
  )
    .sort((a, b) => a.date - b.date);

  const reducer = (resultData, item) => {
    const index = resultData.findIndex(arrayItem => arrayItem.type === item.type);
    if (index >= 0) {
      resultData[index].amount = resultData[index].amount + item.amount;
    } else {
      resultData.push({ type: item.type, amount: item.amount });
    }
    return resultData;
  };

  let piedata = props.data.reduce(reducer, []);
  piedata = piedata.map((item) => ({
    type: item.type,
    amount: item.amount
  }));

  const piecolors = randomColor({ count: piedata.length });

  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>
      <h3>Kaloreiden kulutus aikajanalla</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey='amount' />
          <XAxis type='number'
                 dataKey='date'
                 domain={['dataMin', 'dataMax']}
                 tickFormatter={
                   value => new Date(value).toLocaleDateString(locale)
                 } />
          <YAxis />
          <Tooltip labelFormatter={
                     value => new Date(value).toLocaleDateString(locale)
                   }
                   formatter={
                     value => [numberFormat.format(value), "Kalorit:"]
                   } />
        </LineChart>
      </ResponsiveContainer>
      <h3>Kalorinpoltto liikuntatyypeittäin</h3>
      <ResponsiveContainer height={350}>
        <BarChart data={piedata}>
          <Bar dataKey='amount'>
            {piedata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={piecolors[index % piecolors.length]} />
            ))}
          </Bar>
          <XAxis dataKey='type' />
          <YAxis />
          <Tooltip formatter={value => [numberFormat.format(value), "Kalorit:"]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;