import React, { useEffect, useRef, useState } from 'react';
import List from './components/List'
import { Alert } from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  return list ? JSON.parse(localStorage.getItem('list')) : [];
};

function App() {

  const [productList, setProductList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);


  const EmptyAlert = () => {
    setAlert(true)
    return console.log('soy el empty alert');
  }

  const SetItemAlert = () => {
    // setAlert(true)
    console.log('has añadido un producto, estas en setItemAlert');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value === '') {
      return EmptyAlert();

    } else if (inputRef.current.value && isEdit === true) {
      setProductList(productList.map((item) => {
        if (item.id === editId) {
          return { ...item, title: inputRef.current.value }
        }
        return item;
      }));
      setIsEdit(false);
      inputRef.current.value = '';

    } else {
      SetItemAlert();
      const newProduct = { id: new Date().getTime().toString(), title: inputRef.current.value }
      setProductList([...productList, newProduct]);
      inputRef.current.value = '';
    }
  }

  const EditClick = (ide) => {
    setIsEdit(true);
    setEditId(ide);
    let itemToEdit = productList.filter(item => item.id === ide);
    itemToEdit = itemToEdit[0];
    inputRef.current.value = itemToEdit.title;
  }

  const DeleteClick = (id) => {
    let filteredList = productList.filter((item) => {
      return item.id !== id;
    });
    setProductList(filteredList);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(productList));
  }, [productList]);

  return (
    <div className='container'>
      {alert && <Alert setAlert={setAlert} />}
      <h1 className='title'>Shopping List</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' className='input' ref={inputRef} placeholder='e.g. eggs' />
        <button type='submit' className='btn-submit'>{isEdit ? 'Edit' : 'Submit'}</button>
      </form>
      <List productList={productList} EditClick={EditClick} DeleteClick={DeleteClick} />

    </div>
  );
}

export default App;
