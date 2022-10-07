import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function DisplayAlert({ alert }) {
    return (
        <Snackbar open={alert.open} autoHideDuration={2000} >
            <Alert severity={alert.severity ? alert.severity : 'error'} variant="filled" sx={{ width: '100%' }} >
                {alert.message}
            </Alert>
        </Snackbar>
    )
}
