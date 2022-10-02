import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { db } from '../../firebaseconfig'
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import Loader from '../../helpers/Loader';

export default function StoreForm({ open, handleClose, editData, formMode }) {
    const [showLoader, setShowLoader] = useState(false);

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [contact, setContact] = useState('')

    useEffect(() => {
        if (formMode == 'edit') {
            setName((editData.data.name ? editData.data.name : ''))
            setAddress((editData.data.address ? editData.data.address : ''))
            setPhone((editData.data.phone ? editData.data.phone : ''))
            setContact((editData.data.contact ? editData.data.contact : ''))

        }
        return () => {

        };
    }, [editData]);


    function handleSubmit() {
        setShowLoader(true)
        if (formMode == 'add') {
            const storeRef = addDoc(collection(db, "stores"), {
                name: name,
                address: address,
                phone: phone,
                contact: contact
            }).then(e => {
                setShowLoader(false)

                console.log('data added')
                handleClose()
            })
        }
        else if (formMode == 'edit') {
            const storeRef = doc(db, "stores", editData.id);

            // Set the "capital" field of the city 'DC'
            updateDoc(storeRef, {
                name: name,
                address: address,
                phone: phone,
                contact: contact
            }).then(e => {
                setShowLoader(false)

                console.log('data updated')
                handleClose()
            })
        }

    }



    return (
        <Fragment>
            {showLoader && <Loader />}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Loja</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Nome"
                            label="Name"
                            type="text"
                            value={name}
                            fullWidth
                            onChange={(e) => { setName(e.target.value) }}

                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="address"
                            value={address}
                            label=" Address"
                            type="text"
                            fullWidth
                            onChange={(e) => { setAddress(e.target.value) }}
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone"
                            value={phone}
                            label=" Phone"
                            type="tel"
                            fullWidth
                            onChange={(e) => { setPhone(e.target.value) }}
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="contact"
                            value={contact}
                            label=" Contact Name"
                            type="text"
                            fullWidth
                            onChange={(e) => { setContact(e.target.value) }}
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
