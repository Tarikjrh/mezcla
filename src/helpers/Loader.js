import { Backdrop, Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 100000000 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
