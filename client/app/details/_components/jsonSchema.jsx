'use client'

import { Button } from '@mui/material';
import React from 'react'
import schema from './schema.json'
import { stringify } from 'querystring';

export default function JsonSchema() {
    

const dependencyData = {

  "properties" : {
    "options":{
      "required" : true,
      "type" : "string",
      "uiType" : "radio",
      "values" : [
        {
          "Sinus Pause" : {
            "required" : true,
            "type" : "string",
            "uiType" : "checkBoxes",
            "values" : [
              {
                "SinusPauseOptions" : null
              },
              {
                "SinusPauseOptions2" : null
              }
            ]
          }
        }, 
        {
          "Sinus Cluase" : {
            "required" : true,
            "type" : "string",
            "uiType" : "radio",
            "values" : [
              {
                "SinusClauseOptions1" : {
                  "type" : "string",
                  "uiType" : "checkBoxes",
                  "values" : [
                    {
                      "SinusClauseOptionOption1" : null
                    },
                  ]
                }
              }
            ]
          }
        },
        {
          "Sinus Dause" : null
        }
      ]
    },
   "Do you have a pets?" : {
      "type" : "string",
      "values" : [
        {
          "No" : null,
        },
        {
          "Yes: One" : {
            "type" : "number",
            "required" : true,  
            "values" : [
              {
                "How old is your pet ?" : null
              }
            ]
          }
        },
        {
            "Yes: More than one" : {
                "type" : "boolean",
                "required" : true,
                "values" : [
                    {
                        "Do you want to get rid of any?" : null
                    }
                ]
            }
        }
      ]
   }

  }
};

const generate = (obj) => {

  let schema = {
    "title" : "SA Block",
    "type" : "object",
    "properties" : {
        "options" : {
            "title" : "Choose One Option",
            "type" : "string",
            "enum" : []
        },
        "Do you have a pets?" :{
            "type" : "string",
            "enum" : []
        }
    },
    "required" : ["options", "Do you have a pets?"],
    "dependencies" : {}
  }


  const internalProperties = (skey, element) => {
    let myObj = {
      "properties" : {

      }
    }
    let enumObj = {
      "enum" : [Object.keys(element)[0]]
    };
    myObj.properties[skey] = enumObj

    return myObj;
  }

  // shcema may have dependent properties or not, so need to check the presence of "enum" property 
    let propObj = schema.properties;    //propObj = property object.
    let dependencyObj = schema.dependencies;

    for(let skey in propObj)
    { 
        if("enum" in propObj[skey]) //
        {
            
           dependencyObj[skey] = {"oneOf" : []};

            let enumArr = [];
            dependencyData.properties[skey]["values"].forEach(element => {
                enumArr.push(Object.keys(element)[0]);

                
                let myObj = internalProperties(skey, element);

                dependencyObj[skey]["oneOf"].push(myObj);
            });
            
            propObj[skey]["enum"] = enumArr;
        }
    }

    // let dependencyObj = schema.dependencies;
    // for(let dkey in propObj)
    // {
    //   if("enum" in propObj[skey]) //
    //   {

    //   }
    // }
    
  return schema;
};

// generate(dependencyData);
console.log(generate(dependencyData));

  return (
    <div className='text-3xl font-bold underline'>
      Hi
      
    </div>
  )
}
