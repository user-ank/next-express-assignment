'use client'

import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import styles from './jsonForm.module.css'
// import { title } from 'process';


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



const anotherSchema : RJSFSchema = {
    title: 'Person',
    type: 'object',
    properties: {
      'Do you have any pets?': {
        type: 'string',
        enum: ['No', 'Yes: One', 'Yes: More than one'],
        // default: 'No',
      },
    },
    required: ['Do you have any pets?'],
    dependencies: {
      'Do you have any pets?': {
        oneOf: [
          {
            properties: {
              'Do you have any pets?': {
                enum: ['No'],
              },
              'How old is your pet?': {
                type: 'number',
              },
            },
          },
          {
            properties: {
              'Do you have any pets?': {
                enum: ['Yes: One'],
              },
              'How old is your pet?': {
                type: 'number',
              },
            },
            required: ['How old is your pet?'],
          },
          {
            properties: {
              'Do you have any pets?': {
                enum: ['Yes: More than one'],
              },
              'Do you want to get rid of any?': {
                type: 'boolean',
              },
            },
            required: ['Do you want to get rid of any?'],
          },
        ],
      },
    },
  };

const initSchema: RJSFSchema = {
  title: 'Todo',
  type: 'object',
  properties: {
    // title: { type: 'string', title: 'Title', default: 'A new task' },
    'options': { 
      title: 'Select an option', 
      type : 'string',
      oneOf: [
        //{const : 1, title : 'Option 1'}, // dummy data for structure understanding
        // {const : 2, title : 'Option 2'},
      ]
      // enum : ['Option 1', 'Option 2'],
    },
  },
  required : ['options'],

  dependencies : {
    'options' : {
      oneOf : [
        {
          properties : {
            'options': {const : 1},

            'radioOptions' : {
              title : 'Choose one',
              type : 'number',
              oneOf : [
                // {const : 1, title : 'Radio 1'},
                // {const : 2, title : 'Radio 2'},
                // {const : 3, title : 'Radio 3'},
              ],
            }
          },
          required : ['radioOptions'],
        },
        {
          properties : {
            'options' : {const : 2},

            'radioOptions' : {
              title : 'Choose one',
              type : 'number',
              oneOf : [
                {const : 4, title : 'Radio 4'},
                // {const : 5, title : 'Radio 5'},
                // {const : 6, title : 'Radio 6'},
              ],
            },
          },
          required : ['radioOptions'],
        },
      ]
    }    
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
  // console.log('Yes i ran')
  newSchema.properties.options.oneOf = oneof;

  
  type objType = {const : number, title : string};
  
  let doneof = [];
  for(let i = 0; i < n; i++)           // putting radio options in radioOptions (anyOf)
  {
    let obj = {
        properties : {
          'options': {const : i + 1},
          'radioOptions' : {
            title : 'Choose one',
            type : 'number',
            oneOf : [
            ],
          }
        },
        required : ['radioOptions'],
    }
    for(let key in optionsArray[i])       
    {
      let value : any = optionsArray[i][key];
      let text : string  = key;
      
      obj.properties.radioOptions.oneOf.push({const : value, title : text});
    }
    doneof.push(obj);
    
  }

  console.log(doneof);

  newSchema.dependencies.options.oneOf = doneof;
  setSchema(newSchema); 
}
  
    const log = (type) => console.log.bind(console, type);

export default function JsonForm() {


  const[schema, setSchema] = useState(initSchema);
  const[loading, setLoading] = useState(true);

  
  
  useEffect( ()=>{

    setTimeout(()=>{
      setLoading(false)
      updateSchema(optionsArray1, setSchema);
    }, 500);
  }, [schema])

  return (
  <>
  {
    loading ? "Loading" : 
    <Form
    className={styles.formStyle}
    schema={schema}
    uiSchema={uiSchema}
    validator={validator}
    onChange={log('changed')}
    />
  }

  </>
  )
}
