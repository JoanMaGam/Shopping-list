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
  const [alert, setAlert] = useState({ showAlert: false, message: '', type: '' });
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value === '') {
      return ShowAlert(true, 'Please, enter a value', 'tomato');

    } else if (inputRef.current.value && isEdit === true) {
      setProductList(productList.map((item) => {
        if (item.id === editId) {
          return { ...item, title: inputRef.current.value };
        };
        return item;
      }));
      setIsEdit(false);
      inputRef.current.value = '';
      ShowAlert(true, 'Item modified correctly', 'lightgreen');

    } else {
      ShowAlert(true, 'You have added a new product!', 'lightgreen');
      const newProduct = { id: new Date().getTime().toString(), title: inputRef.current.value };
      setProductList([...productList, newProduct]);
      inputRef.current.value = '';
    };
  };

  const ShowAlert = (showAlert = false, message = '', type = '') => {
    setAlert({ showAlert, message, type });
  };

  const ClearList = () => {
    ShowAlert(true, 'Empty List', 'lightcoral');
    setProductList([]);
  };

  const EditClick = (ide) => {
    setIsEdit(true);
    setEditId(ide);
    let itemToEdit = productList.filter(item => item.id === ide);
    itemToEdit = itemToEdit[0];
    inputRef.current.value = itemToEdit.title;
  };

  const DeleteClick = (id) => {
    let filteredList = productList.filter((item) => {
      return item.id !== id;
    });
    ShowAlert(true, `Item deleted`, 'red');
    setProductList(filteredList);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(productList));
  }, [productList]);

  return (
    <div className='container'>
      {alert && <Alert alert={alert} showAlert={ShowAlert} productList={productList} />}
      <h1 className='title'>Shopping List</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' className='input' ref={inputRef} placeholder='e.g. eggs' />
        <button type='submit' className='btn-submit'>{isEdit ? 'Edit' : 'Submit'}</button>
      </form>
      <List productList={productList} EditClick={EditClick} DeleteClick={DeleteClick} />

      {(productList.length > 0) &&
        <div className='clear-all-btn-container'>
          <button className='clear-all-btn' onClick={ClearList}>Clear all</button>
        </div>
      }
    </div>
  );
};

export default App;
