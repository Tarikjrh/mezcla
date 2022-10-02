import { useState, useEffect, Fragment } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'
import { addDoc, collection, doc, increment, serverTimestamp, Timestamp, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import Loader from '../../helpers/Loader'


export default function SellItemFrom({ open, itemData, handleClose }) {


    const [showLoader, setShowLoader] = useState(false);

    const [sellCount, setSellCount] = useState(1)


    function handleSubmit() {
        setShowLoader(true)


        // Get a new write batch
        const batch = writeBatch(db);

        // Add Venda to db
        const vendaRef = doc(collection(db, "vendas"));
        batch.set(vendaRef, {
            data: itemData.data,
            productId: itemData.id,
            soldCount: sellCount,
            date: serverTimestamp()
        });

        // Update Item Qunatity 
        const storeRef = doc(db, "stores", itemData.data.originStore, 'items', itemData.id);
        batch.update(storeRef, { quantityRemaining: increment((-sellCount)) })


        // Commit the batch
        batch.commit().then(() => {

            console.log('batch complete')
            setShowLoader(false)
            handleClose()
        }).catch(e => { console.log(e) })


    }


    function handleClosePlus() {
        handleClose()
        setSellCount((1))

    }


    return (
        <Fragment>
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


                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
