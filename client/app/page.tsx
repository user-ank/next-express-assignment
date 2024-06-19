import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from "next/link";
import { atom, useAtom } from 'jotai';
import Counter from "./jotai/component/Counter";
import AddButton from "./jotai/component/AddButton";
import SubtractButton from "./jotai/component/SubtractButton";



export default function Home() {
  
  return (
    <main className={styles.main}>
      <Card className={styles.cardStyle} sx={{boxShadow : 3}}>
          Count would be shown here as well : <Counter/>
          <AddButton/>
          <SubtractButton/>
          <div className={styles.description}>
            <p className={styles.tag}> Hey User !</p>
            <p>Please enter your details to proceed further.</p>
          </div>


        <Link href="/jotai">
          <Button variant="outlined" size="small"  >Jotai &rarr;</Button>
        </Link>
        <Link href="/details">
          <Button variant="outlined" size="small"  >Next &rarr;</Button>
        </Link>
      </Card>
    </main>
  );
}
