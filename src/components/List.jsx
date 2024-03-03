import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const List = ({ productList, EditClick, DeleteClick }) => {

    return (
        <div>
            {productList &&
                productList.map((product, index) => {
                    return (
                        <section key={index} className='product'>
                            <p className='product-name'>{product.title}</p>
                            <div className='btn-pad'>
                                <button
                                    className='btn-edit'
                                    onClick={() => EditClick(product.id)}><FaEdit /></button>
                                <button
                                    className='btn-delete'
                                    onClick={() => DeleteClick(product.id)}><MdDelete /></button>
                            </div>
                        </section>
                    )
                })}
        </div >
    )
}

export default List;
