import React from 'react'
import { useEffect } from 'react';

export const Alert = ({ alert, productList, showAlert }) => {

    useEffect(() => {
        setTimeout(() => {
            showAlert();
        }, 3000);
    }, [productList]);

    return (
        <p className='alert' style={{ backgroundColor: alert.type }}>{alert.message}</p>
    )
}
