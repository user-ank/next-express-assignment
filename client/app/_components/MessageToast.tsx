import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// 0) To use this component; Create a state variable and put with ternary condition
// 1) At this moment this component can either show error OR success; so 'error' prop is true for error and false for success.
// 2) setToast is the function returned by useState for the variable created at step 0;
// 3) "message" prop is to display the message accordingly;

export default function MessageToast ({message, setToast, error}){
    
        const [open, setOpen] = useState(true);   // Leave this true since we are not using a button

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen(false);
            setToast(false);
          };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}
            anchorOrigin={!error ? {vertical : 'top', horizontal : 'right'}:{vertical:'bottom',horizontal:'left'}}>
            <Alert variant={error ? 'filled': 'standard'} elevation={6} onClose={handleClose}
                severity={error ? 'error' : 'success'} >{message}</Alert>
        </Snackbar>
    )
}
