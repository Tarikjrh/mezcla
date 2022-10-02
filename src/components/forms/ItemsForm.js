import { useState, useEffect, Fragment } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import { categories } from '../../helpers/categories'
import Loader from '../../helpers/Loader'
import { formatDate } from '../../helpers/formatDate'
import { NumberFormatCustom } from '../../helpers/MoneyInput'
import NumberFormat from 'react-number-format'

export default function ItemsForm({ open, handleClose, storeid, editData, formMode }) {
    const [showLoader, setShowLoader] = useState(false);

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [sellPrice, setSellPrice] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
    const [date, setDate] = useState(new Date())



    useEffect(() => {
        if (formMode == 'edit') {
            setName((editData.data.name ? editData.data.name : ''))
            setCode((editData.data.code ? editData.data.code : ''))
            setCategory((editData.data.category ? editData.data.category : ''))
            setBuyPrice((editData.data.buyPrice ? editData.data.buyPrice : ''))
            setSellPrice((editData.data.sellPrice ? editData.data.sellPrice : ''))
            setTotalQuantity((editData.data.quantityRemaining ? editData.data.quantityRemaining : ''))
            setDate((editData.data.date ? formatDate(new Date(editData.data.date.toDate())) : ''))


        }
        return () => {

        };
    }, [editData]);


    function handleSubmit() {

        setShowLoader(true)
        if (formMode == 'add') {
            const storeRef = addDoc(collection(db, "stores", storeid, 'items',), {
                name: name,
                code: code,
                category: category,
                buyPrice: parseInt(buyPrice),
                sellPrice: parseInt(sellPrice),
                totalQuantity: parseInt(totalQuantity),
                date: date ? Timestamp.fromDate(new Date(date)) : '',
                quantityRemaining: totalQuantity,
                originStore: storeid
            }).then(e => {
                setShowLoader(false)

                console.log('data added')
                handleClose()
            })
        }
        else if (formMode == 'edit') {
            const storeRef = doc(db, "stores", storeid, 'items', editData.id);
            // Set the "capital" field of the city 'DC'
            updateDoc(storeRef, {
                name: name,
                code: code,
                category: category,
                buyPrice: parseInt(buyPrice),
                sellPrice: parseInt(sellPrice),
                // totalQuantity: totalQuantity,
                date: Timestamp.fromDate(new Date(date)),
                quantityRemaining: parseInt(totalQuantity),
                originStore: storeid
            }).then(e => {
                setShowLoader(false)

                console.log('data updated')
                handleClose()
            })
        }

    }

    function resetForm() {
        setName('')
        setCode('')
        setCategory('')
        setBuyPrice('')
        setSellPrice('')
        setTotalQuantity('')
        setDate(new Date())
    }


    return (
        <Fragment>
            {showLoader && <Loader />}

            <Dialog open={open} onClose={() => { resetForm(); handleClose() }}>
                <DialogTitle>Adicionar Item</DialogTitle>
                <DialogContent>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="Nome"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            variant="standard"
                        />
                        <TextField

                            margin="dense"
                            id="code"
                            label="Code"
                            type="text"
                            fullWidth
                            value={code}
                            onChange={(e) => { setCode(e.target.value) }}
                            variant="standard"
                        />
                        <TextField

                            margin="dense"
                            id="Category"
                            label="Category"
                            fullWidth
                            select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            variant="standard"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField

                            margin="dense"
                            id="buyprice"
                            label=" Buy Price"
                            type="tel"
                            fullWidth
                            value={buyPrice}
                            onChange={(e) => { setBuyPrice(e.target.value) }}
                            variant="standard"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                        <TextField

                            margin="dense"
                            id="sellPrice"
                            label="Sell Price "
                            type="text"
                            fullWidth
                            value={sellPrice}
                            onChange={(e) => { setSellPrice(e.target.value) }}
                            variant="standard"
                            helperText={< NumberFormat thousandSeparator={true} prefix={'Profit:     $ '} value={sellPrice - buyPrice} displayType={'text'} />}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                        <TextField

                            margin="dense"
                            id="quantity"
                            label=" Quantity"
                            type="text"
                            fullWidth
                            value={totalQuantity}
                            onChange={(e) => { setTotalQuantity(e.target.value) }}
                            variant="standard"
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}

                            margin="dense"
                            id="date"
                            label=" Date"
                            type="date"
                            fullWidth
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
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
