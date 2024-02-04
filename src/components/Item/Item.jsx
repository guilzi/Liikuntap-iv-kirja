import React, { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';

function Item({ data, ...props }) {
  const [expanded, setExpanded] = useState(false);

  const locale = "fi-FI";
  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale);
  const numberFormat = new Intl.NumberFormat(locale);
  const amount = numberFormat.format(data.amount);

  let average;
  let period;

  if (data.periodStart && data.periodEnd) {
    const startTimeComponents = data.periodStart.split(":");
    const endTimeComponents = data.periodEnd.split(":");

    const periodStart = new Date();
    periodStart.setHours(parseInt(startTimeComponents[0], 10));
    periodStart.setMinutes(parseInt(startTimeComponents[1], 10));

    const periodEnd = new Date();
    periodEnd.setHours(parseInt(endTimeComponents[0], 10));
    periodEnd.setMinutes(parseInt(endTimeComponents[1], 10));

    const formattedStartTime = periodStart.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = periodEnd.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

    period = formattedStartTime + " - " + formattedEndTime;
    const hours = (periodEnd - periodStart) / (60 * 60 * 1000);
    average = (data.amount / hours).toFixed(1);
  }

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${styles.item} ${expanded ? styles.expanded : ''}`} onClick={handleToggleExpand}>
      <div className={styles.item_data}>
        <div className={styles.item_date}>{paymentDate}</div>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_timespan}>{period}</div>
        <div className={styles.item_amount}>{amount} kCal</div>
        <div className={styles.item_average}>{average ? average + " kCal / h" : ""}</div>
        <div className={styles.item_distance}>{data.distance} KM</div>
        <div className={styles.item_heartrate}>{data.heartrate} BPM</div>
        <div className={`${styles.item_info} ${expanded ? styles.expanded : ''}`}>
          {data.info}
        </div>
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}>
          <MdNavigateNext />
        </Link>
      </div>
    </div>
  );
}

export default Item;