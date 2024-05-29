import { Checkbox } from '@nextui-org/react'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'


//Form data is having only one boolean value for options
//Need to provide an array of all checkboxes values by using state variable
function CustomCheckbox(props: WidgetProps) {
    
  return (
    <> 
        {
          props.options.enumOptions.map((element) => {
              return(
                  <Checkbox key={element.value} value={element.value} onClick={() => props.onChange(!props.value)}>{element.value}</Checkbox>
              )
          })
        }
    </>
    
  )
}

export default CustomCheckbox

{/* <input id={String(props.name)} type='checkbox' onClick={() => props.onChange(!props.value)}/>
        <label htmlFor={String(props.name)}
            className='text-1xl font-bold underline ml-2'
        >
            {String(props.name)}
        </label> 
*/}