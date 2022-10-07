import React, { useEffect } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseconfig';

export default function Compras() {

    const q = query(collection(db, "items"),);


    useEffect(() => {

        getAllItems()
        return () => {

        }
    }, [])

    async function getAllItems() {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }

    return (
        <div>Compras</div>
    )
}
