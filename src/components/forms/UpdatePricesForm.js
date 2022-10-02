import { useState, useEffect, Fragment } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, MenuItem, TextField } from '@mui/material'
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
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
        setShowLoader(false)

        handleClosePlus()
    }

    async function getData() {

        console.log(categoryToUpdate)
        const batch = writeBatch(db);



        let q = query(collection(db, "stores", storeid, 'items'), where("category", "==", categoryToUpdate));

        if (categoryToUpdate == 'All') {
            q = query(collection(db, "stores", storeid, 'items'));
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docui) => {
            console.log(docui.data().category)
            const docRef = doc(db, "stores", storeid, 'items', docui.id)
            console.log(docui.data())
            batch.update(docRef, { sellPrice: docui.data().sellPrice * (1 + (amount / 100)) })
        });
        batch.commit()
        console.log('done')

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
                            id="Category"
                            label="Category"
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
                            id="percent"
                            label="Porcentagem"
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
