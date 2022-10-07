import { collection } from 'firebase/firestore';
import React from 'react'
import { db } from '../firebaseconfig';

export default function Fatura() {

    const citiesRef = collection(db, "vendas");

    return (
        <div>Fatura</div>
    )
}
