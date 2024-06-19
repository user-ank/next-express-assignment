import React from 'react'
import type { Metadata } from "next";
import styles from "./page.module.css"
import JotaiTest from './component/jotaiTest';

export const metadata: Metadata = {
    title: "Jotai Page",
    description: "To test jotai atoms",
  };

  
export default function Jotai() {
  
    return (
        <main className={styles.main}>
            <JotaiTest/>  
        </main>
      )
}
