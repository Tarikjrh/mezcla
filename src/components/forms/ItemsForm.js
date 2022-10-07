import { useState, useEffect, Fragment } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, MenuItem, TextField } from '@mui/material'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebaseconfig'
import { categories } from '../../helpers/categories'
import Loader from '../../helpers/Loader'
import { formatDate } from '../../helpers/formatDate'
import { NumberFormatCustom } from '../../helpers/MoneyInput'
import NumberFormat from 'react-number-format'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import ImageLoader from '../../helpers/ImageLoader'
import DisplayAlert from '../../helpers/DisplayAlert'

export default function ItemsForm({ open, handleClose, storeid, editData, formMode }) {
    const [showLoader, setShowLoader] = useState(false);
    const [showImageLoader, setShowImageLoader] = useState(false);
    const [progressAmount, setProgressAmount] = useState(0)
    const [showAlert, setShowAlert] = useState({ open: false, message: '', severity: '' })

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [category, setCategory] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [sellPrice, setSellPrice] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
    const [date, setDate] = useState(new Date())
    const [image, setImage] = useState('')
    const [buyDiscount, setBuyDiscount] = useState('')


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

    function submitResult() {

    }

    function handleSubmit() {

        setShowLoader(true)
        if (formMode == 'add') {

            if (image === '') {
                const storeRef = addDoc(collection(db, 'items'), {
                    name: name,
                    code: code,
                    category: category,
                    buyPrice: parseInt(buyPrice),
                    sellPrice: parseInt(sellPrice),
                    buyDiscount: parseInt(buyDiscount),
                    newPrice: buyPrice * (1 - (buyDiscount / 100)),
                    totalQuantity: parseInt(totalQuantity),
                    date: date ? Timestamp.fromDate(new Date(date)) : '',
                    quantityRemaining: parseInt(totalQuantity),
                    originStore: storeid
                }).then(e => {
                    setShowLoader(false)

                    console.log('data added')
                    setShowAlert({ open: true, message: 'Item Adicionado Com Sucesso', severity: 'success' })
                    handleClosePlus()

                })
            }
            else {
                // upload Image 
                setShowImageLoader(true)
                const storageRef = ref(storage, 'products/' + image.name);
                const metadata = {
                    contentType: image.type
                };


                const uploadTask = uploadBytesResumable(storageRef, image, metadata);
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setProgressAmount(progress)
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;


                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setShowImageLoader(false)

                            const storeRef = addDoc(collection(db, 'items'), {
                                name: name,
                                code: code,
                                category: category,
                                buyPrice: parseInt(buyPrice),
                                sellPrice: parseInt(sellPrice),
                                totalQuantity: parseInt(totalQuantity),
                                date: date ? Timestamp.fromDate(new Date(date)) : '',
                                quantityRemaining: parseInt(totalQuantity),
                                originStore: storeid,
                                buyDiscount: parseInt(buyDiscount),
                                newPrice: buyPrice * (1 - (buyDiscount / 100)),
                                image: downloadURL
                            }).then(e => {
                                setShowLoader(false)
                                setShowAlert({ open: true, message: 'Item Adicionado Com Sucesso', severity: 'success' })

                                console.log('data added +image')
                                handleClosePlus()

                            })
                        });
                    }
                );
            }


        }
        else if (formMode === 'edit') {
            const storeRef = doc(db, "items", editData.id);
            // Set the "capital" field of the city 'DC'
            updateDoc(storeRef, {
                name: name,
                code: code,
                category: category,
                buyPrice: parseInt(buyPrice),
                sellPrice: parseInt(sellPrice),
                // totalQuantity: totalQuantity,
                buyDiscount: parseInt(buyDiscount),
                newPrice: buyPrice * (1 - (buyDiscount / 100)),
                date: Timestamp.fromDate(new Date(date)),
                quantityRemaining: parseInt(totalQuantity),
            }).then(e => {
                setShowLoader(false)
                setShowAlert({ open: true, message: 'Item Adicionado Com Sucesso', severity: 'success' })

                console.log('data updated')
                handleClosePlus()
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
        setImage('')
        setBuyDiscount('')
        setDate(new Date())
    }

    function handleCategorySelect(e) {
        setCategory(e);
        setCode(e.substring(0, 3) + parseInt(Math.random() * (10000 - 1) + 1))
    }

    function handleFileChange(e) {
        setImage(e.files[0])
        console.log('image selected')
    }



    function handleClosePlus() {
        handleClose()
        resetForm();

        setTimeout(() => {
            setShowAlert({ open: false, message: '', severity: '' })

        }, 3000);
    }

    return (
        <Fragment>
            <DisplayAlert alert={showAlert} />

            {showLoader && <Loader />}
            {showImageLoader && <ImageLoader progress={progressAmount} />}
            <Dialog open={open} onClose={handleClosePlus}>
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
                            id="Category"
                            label="Category"
                            fullWidth
                            select
                            value={category}
                            onChange={(e) => { handleCategorySelect(e.target.value) }}
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
                            id="code"
                            label="Code"
                            type="text"
                            fullWidth
                            value={code}
                            onChange={(e) => { setCode(e.target.value) }}
                            variant="standard"
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <TextField

                                    margin="dense"
                                    id="buyprice"
                                    label=" Buy Price"
                                    type="tel"
                                    fullWidth
                                    value={buyPrice}
                                    helperText={< NumberFormat thousandSeparator={true} prefix={'Discounted Price:     $ '} value={buyPrice * (1 - (buyDiscount / 100))} displayType={'text'} />}
                                    onChange={(e) => { setBuyPrice(e.target.value) }}
                                    variant="standard"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField

                                    margin="dense"
                                    id="buyprice"
                                    label="Discount"
                                    type="tel"
                                    fullWidth
                                    value={buyDiscount}
                                    onChange={(e) => { setBuyDiscount(e.target.value) }}
                                    variant="standard"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <TextField

                            margin="dense"
                            id="sellPrice"
                            label="Sell Price "
                            type="text"
                            fullWidth
                            value={sellPrice}
                            onChange={(e) => { setSellPrice(e.target.value) }}
                            variant="standard"
                            helperText={< NumberFormat thousandSeparator={true} prefix={'Profit:     $ '} value={sellPrice - (buyPrice * (1 - (buyDiscount / 100)))} displayType={'text'} />}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                        <TextField

                            margin="dense"
                            id="quantity"
                            label=" Quantity"
                            type="number"
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
                        <input type="file" accept='.jpg,.png,.jpeg,.svg' onChange={(e) => handleFileChange(e.target)}
                        />
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePlus}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
