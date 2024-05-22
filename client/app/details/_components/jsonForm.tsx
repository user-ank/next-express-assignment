'use client'

import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import styles from './jsonForm.module.css'


// simulating that an fetched may have different number of inputs.
const optionsArray1 = [
  {'Radio 1' : 1, 'Radio 2' : 2, 'Radio 3' : 3},
  {'Radio 4' : 4, 'Radio 5' : 5, 'Radio 6' : 6}
]
const optionsArray2 = [
  {'DRadio 1' : 1, 'DRadio 2' : 2, 'DRadio 3' : 3}, 
  {'DRadio 4' : 4, 'DRadio 5' : 5, 'DRadio 6' : 6}, 
  {'DRadio 7' : 7, 'DRadio 8' : 8, 'DRadio 9' : 9}, 
]


const initSchema: RJSFSchema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    // title: { type: 'string', title: 'Title', default: 'A new task' },
    options: { 
      title: 'Select an option', 
      type : 'number',
      oneOf: [
        {const : 1, title : 'Option 1'}, // dummy data for structure understanding
        {const : 2, title : 'Option 2'},
      ]
    },
    
  },
  if : {
    options : {const : 1},
  },
  then : {
    radioOptions : {
      title : 'Choose one',
      type : 'number',
      oneOf : [
        {const : 1, title : 'Radio 1'},
        {const : 2, title : 'Radio 2'},
        {const : 3, title : 'Radio 3'},
      ],
    },
  },
};

const uiSchema = {
  'options' : {
    'ui:widget' : 'select',
    'ui:placeholder': 'Select'
  },
  'radioOptions' : {
    'ui:widget' : 'radio'
  }
}

function updateSchema(optionsArray, setSchema){
  const newSchema = initSchema;
  let n = optionsArray.length;
  let oneof = [];
  for(let i = 0; i < n; i++)
  {
    let obj : { [key: string | number]: any } = {};
    obj['const'] = i + 1;
    obj['title'] = `Option ${i + 1}`;
    oneof.push(obj);
  }
  console.log('Yes i ran')
  newSchema.properties.options.oneOf = oneof;
  setSchema(newSchema); 
}
  
    const log = (type) => console.log.bind(console, type);

export default function JsonForm() {


  // const[schema, setSchema] = useState(initSchema);
  const[loading, setLoading] = useState(false);

  
  
  // useEffect( ()=>{

  //   setTimeout(()=>{
  //     setLoading(false)
  //     updateSchema(optionsArray1, setSchema);
  //   }, 500);
  // }, [schema])

  return (
  <>
  {
    loading ? "Loading" : 
    <Form
    className={styles.formStyle}
    uiSchema={uiSchema}
    schema={initSchema}
    validator={validator}
    onChange={log('changed')}
    />
  }

  </>
  )
}
