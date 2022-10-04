import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('md')]: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}))

export default function ItemCard({ data, storeid, handleEdit, handleSell }) {
    let navigate = useNavigate();

    function handleViewDetails() {
        navigate(`storedetails/${storeid}`);
    }
    return (
        <Card>
            <Grid container spacing={6}>
                <StyledGrid item md={5} xs={12}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
                    </CardContent>
                </StyledGrid>
                <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                        paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                        paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
                    }}
                >
                    <CardContent>
                        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                            Apple iPhone 11 Pro
                        </Typography>
                        <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                            Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8″ display Apple A13 Bionic
                        </Typography>
                        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
                            Price:{' '}
                            <Box component='span' sx={{ fontWeight: 'bold' }}>
                                $899
                            </Box>
                        </Typography>
                    </CardContent>

                </Grid>
            </Grid>
        </Card>
    )
}
