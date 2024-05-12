import { Alert } from "@mui/material";
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from "next/link";



export default function Home() {

  return (
    <main className={styles.main}>
      <Card className={styles.cardStyle} sx={{boxShadow : 3}}>
        
          <div className={styles.description}>
            <p className={styles.tag}> Hey User !</p>
            <p>Please enter your details to proceed further.</p>
          </div>
        
        <Link href="/details">
          <Button variant="outlined" size="small"  >Next &rarr;</Button>
        </Link>
      </Card>
    </main>
  );
}
