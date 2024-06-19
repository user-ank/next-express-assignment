'use client'
import styles from '../page.module.css'
import React from 'react'
import AddButton from './AddButton'
import SubtractButton from './SubtractButton'
import { atom, useAtomValue } from 'jotai'
import Counter from './Counter'

export const counterAtom = atom(0);

export default function JotaiTest() {
    const count = useAtomValue(counterAtom);
    return (
        <div className={styles.counterBlock}>

            <div className={styles.count}> Count : <Counter/></div>
            <AddButton /> <SubtractButton />

        </div>
    )
}

