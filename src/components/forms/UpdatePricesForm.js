import { useState, useEffect, Fragment } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { db } from '../../firebaseconfig'
import Loader from '../../helpers/Loader'
import { categories } from '../../helpers/categories'
import { useParams } from 'react-router-dom';

export default function UpdatePricesForm({ open, itemData, handleClose, storeid }) {

    const [showLoader, setShowLoader] = useState(false);

    const [categoryToUpdate, setCategoryToUpdate] = useState('All');
    const [amount, setAmount] = useState('');




    function handleSubmit() {
        setShowLoader(true)

        getData()

    }
    // const batch = db.batch()

    // db.collection('cities').get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         const docRef = db.collection('cities').doc(doc.id)
    //         batch.update(docRef, { capital: true })
    //     });

    //     batch.commit();
    // });

    async function getData() {

        const batch = writeBatch(db);


        const querySnapshot = await getDocs(collection(db, "stores", storeid, 'items'));
        querySnapshot.forEach((docui) => {

            const docRef = doc(db, "stores", storeid, 'items', docui.id)

            batch.update(docRef, { sellPrice: 10 })
            console.log(docui.id, " => ", docui.data());
        });
        batch.commit();
    }
    function handleClosePlus() {
        //reset values
        handleClose()
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
                            value={categoryToUpdate}
                            onChange={(e) => { setCategoryToUpdate(e.target.value) }}
                            variant="standard"
                            select
                        >
                            <MenuItem key={'All'} value={'All'}>
                                {'All'}
                            </MenuItem>
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            id="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
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
