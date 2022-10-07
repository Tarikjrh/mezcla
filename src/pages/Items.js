import { Button, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import StoreForm from '../components/forms/StoreForm';
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseconfig';
import StoreCard from '../components/StoreCard';
import ItemCard from '../components/ItemCard';
import ItemsForm from '../components/forms/ItemsForm';
import SellItemFrom from '../components/forms/SellItemFrom';

export default function Items() {
    const [storeDetails, setStoreDetails] = useState([])
    const [open, setOpen] = useState({ open: false, editData: '', mode: '' });
    const [openSellForm, setOpenSellForm] = useState({ open: false, itemData: '', })
    const [updatePricesForm, setUpdatePricesForm] = useState({ open: false, itemData: '' });

    useEffect(() => {

        const q = query(collection(db, "items"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArray = []
            querySnapshot.forEach((doc) => {
                itemsArray.push({ data: doc.data(), id: doc.id });

            });
            setStoreDetails(itemsArray)

        });
    }, [])

    const handleClickOpen = () => {
        setOpen({ open: true, editData: '', mode: 'add' });
    };
    const handleClose = () => {
        setOpen({ open: false, editData: '', mode: '' });
    };
    const handleEdit = (e) => {
        setOpen({ open: true, editData: e, mode: 'edit' })
    }

    const handleSell = (e) => {
        setOpenSellForm({ open: true, itemData: e, })
    }
    const handleCloseSellFrom = () => {
        setOpenSellForm({ open: false, itemData: '', })
    };

    return (
        <Box sx={{ m: 5 }}>
            <ItemsForm open={open.open} handleClose={handleClose} storeid={open.editData.originStore} editData={open.editData} formMode={open.mode} />
            <SellItemFrom open={openSellForm.open} itemData={openSellForm.itemData ? openSellForm.itemData : ''} handleClose={handleCloseSellFrom} />
            <Grid container spacing={(6)} mt={{ md: 3 }}>
                {storeDetails.map(item => {
                    return <Grid item key={item.id} xs={12} sm={4}>
                        <ItemCard data={item.data} itemid={item.id} handleEdit={() => { handleEdit(item) }} handleSell={() => { handleSell(item) }} />
                    </Grid>
                })}
            </Grid>
        </Box>
    )
}
