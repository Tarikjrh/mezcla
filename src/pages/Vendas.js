import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebaseconfig';
import VendasTable from '../components/Tables/VendasTable';
import { Grid } from '@mui/material';
import DataTable from '../components/Tables/DataTable';

export default function Vendas() {

    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "vendas"));
        const unsubscribe = onSnapshot(q, orderBy("date", "desc"), (querySnapshot) => {
            const vendasArray = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().data.name)
                let short = doc.data().data
                vendasArray.push({
                    name: short.name,
                    category: short.category,
                    date: doc.data().date,
                    buyPrice: short.buyPrice,
                    sellPrice: short.sellPrice,
                    newPrice: short.buyPrice,
                    originalStore: short.originalStore,
                    soldCount: doc.data().soldCount,
                    productId: doc.data().productId,
                    quantityRemaining: short.quantityRemaining

                });
            });
            console.log(vendasArray)
            setVendas(vendasArray)
        });
        return () => {

        };
    }, []);


    return (
        <Grid container >
            <Grid item xs={12} mt={{ sm: 10 }}>
                {vendas.length > 0 && <DataTable tableData={vendas} />}
                {/* {vendas.length > 0 && <VendasTable tableData={vendas} />} */}
                {vendas.length == 0 && <h1>no sales</h1>}
            </Grid>
        </Grid>
    )
}
