import styles from './Menu.module.scss'
import { MdOutlineFormatListBulleted, MdTimeline, MdSettings } from "react-icons/md";
import { NavLink } from 'react-router-dom'

function Menu() {

  return (
    <div className={styles.menu}>
      <div><NavLink to=""><MdOutlineFormatListBulleted /></NavLink></div>
      <div><NavLink to="/stats"><MdTimeline /></NavLink></div>
      <div><NavLink to="/settings"><MdSettings /></NavLink></div>
    </div>
  )

}

export default Menu