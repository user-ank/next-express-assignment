import { WidgetProps } from '@rjsf/utils'
import React from 'react'

function CustomCheckbox(props: WidgetProps) {
    
  return (
    <>
        <input id={String(props.name)} type='checkbox' onClick={() => props.onChange(!props.value)}/>
        <label htmlFor={String(props.name)}
            className='text-1xl font-bold underline ml-2'
        >
            {String(props.name)}
        </label>
    </>
    
  )
}

export default CustomCheckbox
