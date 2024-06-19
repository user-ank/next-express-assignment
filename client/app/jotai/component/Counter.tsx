'use client'

import { atom, useAtom, useAtomValue } from "jotai";
import { counterAtom } from "./jotaiTest";


export default function Counter() {
    
    const count = useAtomValue(counterAtom);
  return (
    <span>
      {count}
    </span>
  )
}
