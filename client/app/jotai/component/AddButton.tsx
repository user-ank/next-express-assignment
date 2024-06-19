'use client'
import { Button } from '@nextui-org/react'
import { useSetAtom } from 'jotai'
import React from 'react'
import { counterAtom } from './jotaiTest'

export default function AddButton() {
    const setCount = useSetAtom(counterAtom);

  return (
    <div>
      <Button onClick={()=> setCount((count) => count + 1)}>Add to counter</Button>
    </div>
  )
}
