import React, { useRef } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const List = ({ productList, EditClick, DeleteClick }) => {

    const editBtnRef = useRef(null);
    const deleteBtnRef = useRef(null);




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
                                    ref={editBtnRef}
                                    onClick={() => EditClick(product.id)}><FaEdit /></button>
                                <button
                                    className='btn-delete'
                                    ref={deleteBtnRef}
                                    onClick={() => DeleteClick(product.id)}><MdDelete /></button>
                            </div>
                        </section>
                    )
                })}
        </div >
    )
}

export default List;
