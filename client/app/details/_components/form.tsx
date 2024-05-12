'use client'

import {useState} from 'react';
import styles from './form.module.css';
import { Button, TextField } from '@mui/material';
import MessageToast from '../../_components/MessageToast'
import Spinner from '@/app/_components/Spinner';

type initValues = {
    firstName : string;
    lastName : string;
    file : File | null;
}

export default function FormComponent() {

    const initialValues : initValues = {
        firstName: "", 
        lastName: "",
        file: null
    }
    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(false); // To show loading while submission

    const[toast, setToast] = useState({
        open:false,
        error:false,
        message: ''
    });
    
    const changeHandler = (e : any) => {

        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name ]: e.target.value}));   
        console.log(formData);
    }

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFormData({
            ...formData,
            file: event.target.files[0],
          });

            let element = document.getElementById('fileName');
            if(element)                                         // setting the name of file to be shown
                element.innerHTML = event.target.files[0].name;
        }
        else{
            console.log("Could not set file for upload");
        }
    };

    const validateFileUpload = () => {
        // First name and Last name validation is handled by MUI.
        // File upload validation is handled here. No empty field allowed.
        let fileElement = document.getElementById('file');
        let fileDiv = document.getElementById('fileDiv');

        if(fileElement.value == ''){
            fileDiv.style.borderColor = "red";
            setToast({open:true, error:true, message:'Please select a file'});  // waring message toast
            return false;
        }
        return true;
    }

    const createFormDataPost = () => {
        const formDataPost = new FormData();
        formDataPost.append('firstName', formData.firstName);
        formDataPost.append('lastName', formData.lastName);
        formDataPost.append('file', formData.file as File);
        return formDataPost;
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();

        if(!validateFileUpload())
            return;
        else{
            if(toast.open)                 // If warning is showing then it should go away
                setToast((toast)=>({...toast, open:false})); 
            setLoading(true);             // loading true to show spinner
     
            
            try {
                const formDataPost = createFormDataPost();
                const response = await fetch('http://127.0.0.7:8080/upload', {
                    method: 'POST',
                    body: formDataPost,
                });
                if (response.ok) {
                    // successful upload
                    const data = await response.json();
                    console.log(data);
                    setToast({open:true, error:false, message:'Successfuly submitted'});
                } else {
                    setToast({open:true, error:true, message:'Failed to upload file'});
                    // faled upload
                }

                
            } catch (error) {
                // Handling error
                console.error('Error uploading file:', error);
                setToast({open:true, error:true, message:'Error uploading file'});
                
            } finally{
                setLoading(false);            // loading false to remove spinner
            }
        }

    }


  return (
    <form onSubmit={submitHandler} className={styles.formStyle}>
        <div className={styles.heading}>Your Details</div>

        <div className={styles.names}>
          <TextField size='small' label='First Name' name='firstName' id='fname' required className={styles.name}
                    onChange={changeHandler}/>
          <TextField size='small' label='Last Name' name='lastName' id='lname' required className={styles.name}
                    onChange={changeHandler}/>
        </div>

        <div id='fileDiv'className={styles.file} 
        onClick={()=>{ document.getElementById('fileDiv').style.borderColor = "rgb(179, 179, 179)";}}
        >
          <span className={styles.fileText}>Select your profile image</span>
          
          <label className={styles.customFileUpload}>
                <input onChange={handleFileChange} className={styles.fileInput} type="file" accept="image/*" id="file" name="file" />
                Browse 
          </label>
          <div id='fileName' className={styles.fileName}></div>
        </div>
       
        {loading ? <Spinner/> : <Button type='submit' variant='contained'>Submit</Button>}

        {toast.open ? <MessageToast message={toast.message} setToast={setToast} error={toast.error} /> : null} 
        
    </form>
  )
}
