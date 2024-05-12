import React from 'react'
import type { Metadata } from "next";
import styles from "./page.module.css"
import { Alert, Card, Snackbar} from '@mui/material';
import FormComponent from './_components/form';

export const metadata: Metadata = {
    title: "Details Page",
    description: "Enter your details here",
  };


export default function details() {
    // const [error, setError] = React.useState(false);
    // const [success, setSuccess] = React.useState(false);


  return (
    <main className={styles.main}>
      <Card sx={{boxShadow : 2}}>
        <FormComponent />   
      </Card>
    
    </main>
  )
}
