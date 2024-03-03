import React from 'react'

export const Alert = ({ setAlert }) => {

    setTimeout(() => {
        setAlert(false)
    }, 3000);


    return (
        <div>Please enter a value</div>
    )
}
