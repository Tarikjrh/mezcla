import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DotMenu from './menu/DotMenu';
import { Badge, Box, Grid, Snackbar } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import DisplayAlert from '../helpers/DisplayAlert';
import ConfirmDelete from './ConfirmDelete';

export default function ItemCard({ data, itemid, handleEdit, handleSell, handleDelete }) {
    const { pathname } = useLocation();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showAlert, setShowAlert] = useState({ open: false, message: '', severity: '' })



    function handleAction(e) {
        if (e == 'edit') {
            handleEdit()
        }
        if (e == 'delete') {
            console.log(itemid)
            setShowDeleteDialog(true)
        }
    }

    function handleDelete() {
        deleteDoc(doc(db, "items", itemid)).then(e => {
            console.log(e)
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
        <Badge color="primary" badgeContent={data.quantityRemaining} sx={{ width: '100%', height: '100%' }}>
            <ConfirmDelete open={showDeleteDialog} handleClose={() => { setShowDeleteDialog(false) }} confirmDelete={handleDelete} />
            <DisplayAlert alert={showAlert} />

            <Card sx={{ width: '100%', height: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                <Grid container justifyContent={'space-between'} px={{ xs: 0 }}>
                    <Grid item xs={8} >
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" sx={{ mb: 0 }}>

                                {data.name}

                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {data.category}
                            </Typography>


                            <Typography variant="h2" color="text.secondary" >
                                $ {data.sellPrice.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                Custo: $ {data.newPrice.toFixed(2)}
                            </Typography>




                        </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                        <DotMenu handleAction={(e) => { handleAction(e) }} />

                        <CardMedia
                            component="img"
                            height="140"
                            image={data.image ? data.image : pathname == '/items' ? `imgs/${data.category}.jpg` : `../../imgs/${data.category}.jpg`}
                            alt={data.name}
                        />
                    </Grid>

                </Grid>
                <CardActions>
                    <Button variant="outlined" size="small" onClick={handleSell} fullWidth>Vender</Button>
                </CardActions>

            </Card>
        </Badge>
    )
}
