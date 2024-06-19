'use client'


import { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import CustomCheckbox from '@/app/_components/customCheckbox';
import { RJSFSchema, RegistryWidgetsType, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import styles from './jsonForm.module.css'
import CustomRadioButton from '@/app/_components/customRadioButton';
import CustomObjectFieldTemplate from '../common/CustomObjectFieldTemplate';
// import { title } from 'process';

export function CheckForm() {

const schema : RJSFSchema = {
    "type": "object",
    "properties": {
      "Brady": {
        "type": "object",
        "properties": {
          "selectedOptions": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["av2nd", "av3rd"]
            },
            "uniqueItems": true
          },
          "av2nd_options": {
            "type": "string",
            "enum": ["ok1", "ok2"]
          },
          "av3rd_options": {
            "type": "object",
            "properties": {
              "selectedOptions": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": ["option1"]
                },
                "uniqueItems": true
              },
              "option1_details": {
                "type": "string",
                "enum": ["opop1", "opop2"]
              }
            }
          }
        }
      }
    },
    "required": ["Brady"]
  };

  const uiSchema : UiSchema = {
    "Brady": {
        ObjectFieldTemplate : CustomObjectFieldTemplate,
        "selectedOptions": {
          "ui:widget": "checkboxes"
        },
        "av2nd_options": {
          "ui:widget": "radio"
        },
        "av3rd_options": {
            ObjectFieldTemplate : CustomObjectFieldTemplate,
          "selectedOptions": {
            "ui:widget": "checkboxes"
          },
          "option1_details": {
            "ui:widget": "radio"
          }
        }
      }
  };

  const log = (type) => console.log.bind(console, type);
 
    return (

        <Form
            className={styles.formStyle}
            schema={schema}
            uiSchema={uiSchema}
            // widgets={widgets}
            templates={{ObjectFieldTemplate : CustomObjectFieldTemplate}}
            validator={validator}
            onChange={log('changed')}
        />
    )
}