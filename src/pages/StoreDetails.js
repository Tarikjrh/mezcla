import React, { Fragment, useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebaseconfig';
import { useParams } from "react-router-dom";
import { Button, Grid, Box } from '@mui/material';
import ItemsForm from '../components/forms/ItemsForm';
import ItemCard from '../components/ItemCard';
import SellItemFrom from '../components/forms/SellItemFrom';
import UpdatePricesForm from '../components/forms/UpdatePricesForm';
import DisplayItems from '../components/DisplayItems';
import AddIcon from '@mui/icons-material/Add';
import PercentIcon from '@mui/icons-material/Percent';

export default function StoreDetails() {
    const [storeDetails, setStoreDetails] = useState([])
    const [open, setOpen] = useState({ open: false, editData: '', mode: '' });
    const [openSellForm, setOpenSellForm] = useState({ open: false, itemData: '', })
    const [updatePricesForm, setUpdatePricesForm] = useState({ open: false, itemData: '' });

    let { storeid } = useParams();
    useEffect(() => {

        const q = query(collection(db, "items"), where("originStore", "==", storeid));
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
    const handleUpdatePrices = (e) => {
        setUpdatePricesForm({ open: true, itemData: e, storeid: storeid })
    }
    const handleCloseUpdatePrices = () => {
        setUpdatePricesForm({ open: false, itemData: '', })
    };


    return (
        <Box >

            <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2} spacing={2} >
                <Grid item>
                    <Button onClick={handleClickOpen} color={'secondary'} variant={'contained'}><AddIcon /> Add Items</Button>

                </Grid>
                <Grid item>
                    <Button onClick={handleUpdatePrices} color={'secondary'} variant={'contained'}><PercentIcon /> Update Prices</Button>

                </Grid>


            </Grid>
            <ItemsForm open={open.open} handleClose={handleClose} storeid={storeid} editData={open.editData} formMode={open.mode} />
            <SellItemFrom open={openSellForm.open} itemData={openSellForm.itemData ? openSellForm.itemData : ''} handleClose={handleCloseSellFrom} />
            <UpdatePricesForm open={updatePricesForm.open} itemData={updatePricesForm.itemData ? updatePricesForm.itemData : ''} handleClose={handleCloseUpdatePrices} storeid={storeid} />


            <DisplayItems storeDetails={storeDetails} handleEdit={handleEdit} handleSell={handleSell} />


        </Box>
    )
}
