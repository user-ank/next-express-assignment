import { CircularProgress } from '@mui/material'
import styles from './Spinner.module.css'


export default function Spinner() {
  return (
    <div className={styles.spinnerDiv}>
      <CircularProgress disableShrink size={30}/>
    </div>
  )
}
