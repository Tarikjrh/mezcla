import { Grid } from '@mui/material'
import React from 'react'
import ItemCard from './ItemCard'

export default function DisplayItems({ storeDetails, handleEdit, handleSell }) {
    return (
        <Grid container spacing={(2)} >
            {storeDetails.map(item => {
                return <Grid item key={item.id} justifyContent={{ md: "flex-start", xs: "center" }} xs={12} sm={6} lg={4}>
                    <ItemCard data={item.data} itemid={item.id} handleEdit={() => { handleEdit(item) }} handleSell={() => { handleSell(item) }} />
                </Grid>
            })}
        </Grid>)
}
