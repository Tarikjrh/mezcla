import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DotMenu from './menu/DotMenu';
import { Grid } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import ConfirmDelete from './ConfirmDelete';
import DisplayAlert from '../helpers/DisplayAlert';
import { styled, useTheme } from '@mui/material/styles'

export default function StoreCard({ data, storeid, handleEdit }) {
    let navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showAlert, setShowAlert] = useState({ open: false, message: '', severity: '' })
    const theme = useTheme()

    console.log(theme.palette.primary)

    function handleViewDetails() {
        navigate(`storedetails/${storeid}`);
    }



    function handleAction(e) {
        if (e == 'edit') {
            handleEdit()
        }
        if (e == 'delete') {
            setShowDeleteDialog(true)
            // deleteDoc(doc(db, "stores", storeid)).then('item deleted');
        }
    }

    function handleDelete() {
        deleteDoc(doc(db, "stores", storeid)).then('item deleted').then(e => {
            setShowAlert({ open: true, message: 'Item Deletado Com Sucesso', severity: 'success' })
            handleClosePlus()
        }).catch(e => {
            setShowAlert({ open: true, message: `error ${e}`, severity: 'error' })
            handleClosePlus()
        })
    }

    function handleClosePlus() {
        setShowDeleteDialog(false)

        setTimeout(() => {
            setShowAlert({ open: false, message: '', severity: '' })
        }, 3000);
    }



    return (
        <Card sx={{ minWidth: 250, height: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'column', boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)', color: '#3a3541de', fontFamily: 'Inter', fontWeight: '500' }}>
            <DisplayAlert alert={showAlert} />

            <ConfirmDelete open={showDeleteDialog} handleClose={() => { setShowDeleteDialog(false) }} confirmDelete={handleDelete} />
            <Grid container justifyContent={'space-between'} px={{ xs: 0 }}>
                <Grid item xs={10} >
                    <CardContent >
                        {/* <Typography gutterBottom variant="h5" component="div" sx={{ width: '100%' }}>

                        </Typography> */}
                        <Typography variant='h6'> {data.name}</Typography>

                        {/* <Typography gutterBottom variant="h5" component="div" sx={{ width: '100%' }}>
                            {data.name}
                        </Typography> */}
                        {/* <Typography variant="body1" color="text.secondary">
                            {data.address}
                        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                            {data.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.contact}
                        </Typography>




                    </CardContent>
                </Grid>
                <Grid item xs={2}>
                    <DotMenu handleAction={(e) => { handleAction(e) }} />
                </Grid>

            </Grid>
            <CardActions>
                <Button variant="outlined" size="small" color={'secondary'} onClick={handleViewDetails} fullWidth>Items</Button>
            </CardActions>


        </Card >
    )
}
