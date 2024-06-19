import React from 'react'
import type { Metadata } from "next";
import styles from "./page.module.css"
import { CheckForm } from './_components/checkForm';
import Counter from '../jotai/component/Counter';


export const metadata: Metadata = {
    title: "Details Page",
    description: "Enter your details here",
  };


export default function details() {
    // const [error, setError] = React.useState(false);
    // const [success, setSuccess] = React.useState(false);


  return (
    <main className={styles.main}>
      
        <CheckForm/>  
      
        <Counter/>
    </main>
  )
}
