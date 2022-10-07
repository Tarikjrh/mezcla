import { Backdrop, Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import React from 'react'

export default function ImageLoader({ progress }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 100000000 }}
            open={true}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        progress
                    )}%`}</Typography>
                </Box>
            </Box>
        </Backdrop>
    )
}
