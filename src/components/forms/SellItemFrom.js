import { useState, useEffect, Fragment } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'
import { addDoc, collection, doc, increment, serverTimestamp, Timestamp, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import Loader from '../../helpers/Loader'
import DisplayAlert from '../../helpers/DisplayAlert'


export default function SellItemFrom({ open, itemData, handleClose }) {


    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState({ open: false, message: '', severity: '' })

    const [sellCount, setSellCount] = useState(1)
    const [discount, setDiscount] = useState('');


    function handleSubmit() {
        setShowLoader(true)


        // Get a new write batch
        const batch = writeBatch(db);

        // Add Venda to db
        const vendaRef = doc(collection(db, "vendas"));
        batch.set(vendaRef, {
            data: itemData.data,
            productId: itemData.id,
            sellDiscount: discount,
            soldCount: sellCount,
            date: serverTimestamp()
        });

        // Update Item Qunatity 
        const storeRef = doc(db, "items", itemData.id);
        batch.update(storeRef, { quantityRemaining: increment((-sellCount)) })


        // Commit the batch
        batch.commit().then(() => {

            console.log('batch complete')
            setShowLoader(false)
            handleClosePlus()
            setShowAlert({ open: true, message: 'Item Vendido Com Sucesso', severity: 'success' })

        }).catch(e => {
            console.log(e)
            setShowAlert({ open: true, message: e, severity: 'error' })
            handleClosePlus()

        })


    }


    function handleClosePlus() {
        handleClose()
        setDiscount('')
        setSellCount((1))
        setTimeout(() => {
            setShowAlert({ open: false, message: '', severity: '' })

        }, 3000);
    }


    return (
        <Fragment>
            <DisplayAlert alert={showAlert} />

            {showLoader && <Loader />}

            <Dialog open={open} onClose={handleClosePlus}>
                <DialogTitle>Venda do Item {itemData.data ? itemData.data.name : ''}</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            value={sellCount}
                            onChange={(e) => { setSellCount(e.target.value) }}
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="quantity"
                            label="Discount"
                            type="number"
                            fullWidth
                            value={discount}
                            onChange={(e) => { setDiscount(e.target.value) }}
                            variant="standard"
                        />


                    </form>
                    {discount !== '' && <Box sx={{ mt: 5 }}>

                        - ${itemData.data ? itemData.data.sellPrice * ((discount / 100)) : ''}
                    </Box>}
                    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Box>
                            Total:</Box>
                        <Box>
                            ${itemData.data ? itemData.data.sellPrice * (1 - (discount / 100)) : ''}
                        </Box>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
