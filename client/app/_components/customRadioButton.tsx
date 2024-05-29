import { Radio, RadioGroup } from '@nextui-org/react'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'

function CustomRadioButton(props: WidgetProps) {

    // console.log(props);
    return (
        <>
            <RadioGroup>
                {
                props.options.enumOptions.map((element) => {
                    return (
                        <Radio key={element.value} value={element.value} onClick={() => props.onChange(element.value)}>{element.value}</Radio>
                    )
                })
                }
            </RadioGroup>
        </>


    )
}

export default CustomRadioButton
