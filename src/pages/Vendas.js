import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebaseconfig';
import VendasTable from '../components/Tables/VendasTable';
import { Grid } from '@mui/material';

export default function Vendas() {

    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "vendas"));
        const unsubscribe = onSnapshot(q, orderBy("date", "desc"), (querySnapshot) => {
            const vendasArray = [];
            querySnapshot.forEach((doc) => {
                vendasArray.push(doc.data());
            });
            setVendas(vendasArray)
        });
        return () => {

        };
    }, []);


    return (
        <Grid container>
            <Grid item xs={12}>
                {vendas.length > 0 && <VendasTable tableData={vendas} />}
                {vendas.length == 0 && <h1>no sales</h1>}
            </Grid>
        </Grid>
    )
}
