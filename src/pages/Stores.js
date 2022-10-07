import { Button, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import StoreForm from '../components/forms/StoreForm';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseconfig';
import StoreCard from '../components/StoreCard';
import AddIcon from '@mui/icons-material/Add';

export default function Stores() {
    const [open, setOpen] = useState({ open: false, editData: '', mode: '' });
    const [stores, setStores] = useState([])

    const handleClickOpen = () => {
        setOpen({ open: true, editData: '', mode: 'add' });
    };
    const handleClose = () => {
        setOpen({ open: false, editData: '', mode: '' });
    };
    const handleEdit = (e) => {
        setOpen({ open: true, editData: e, mode: 'edit' })
    }

    useEffect(() => {
        const q = query(collection(db, "stores"));
        onSnapshot(q, (querySnapshot) => {
            const stores = [];
            querySnapshot.forEach((doc) => {
                stores.push({ data: doc.data(), id: doc.id });
            });
            console.log(stores);
            setStores(stores)
        });

        return () => {

        }
    }, [])

    return (
        <Box m={{ xs: 1, sm: 2, md: 5 }}>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }} py={{ xs: 2 }} mt={{ xs: 3 }}>
                <Button onClick={handleClickOpen} variant='contained' ><AddIcon />Adicionar Loja</Button>
            </Box>
            <StoreForm open={open.open} handleClose={handleClose} editData={open.editData} formMode={open.mode} />
            <Grid container spacing={(6)}>
                {stores.map(store => {
                    return <Grid item key={store.id}>
                        <StoreCard data={store.data} storeid={store.id} handleEdit={() => { handleEdit(store) }} />
                    </Grid>
                })}
            </Grid>
        </Box >
    )
}
