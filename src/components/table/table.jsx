import React, { useState } from 'react';
import {getDatabase, ref, set, get, update, remove, child, onValue } from "firebase/database";
import ReactDOM from "react-dom";
import Datetime from "react-datetime";
import {theUser} from "../App/App.js"

//const currentUser = theUser;

function TransactionForm(props) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const name = "Flash";
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const currDateTime =  new Date().toLocaleDateString('en-ca')+'T'+new Date().toLocaleTimeString();

  
  const changeType = (event) => {
    setType(event.target.value);
  };
  
  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  const changeDate = (event) => {
    setDate(event.target.value);
  };
  
  
  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      type,
      amount,
      date,
    };
    props.func(val);
    clearState();
    const db = getDatabase();
    var timee = (currDate+currTime).replaceAll('/','');
    console.log("current user is:", theUser);
    const user2 = localStorage.getItem('username');
    set(ref(db, user2+"/"+timee+"/"),
        {
            Transaction: type,
            Amount: amount,
            date: date
        });  
  };
  
  const clearState = () => {
    setType('');
    setAmount('');
    setDate('');
  };
  
  return (
    <div><li>
      <ul><label>Transaction Type:</label>
      <input type="text" id="inputData" value={type} onChange={changeType} /></ul>
      <ul><label>Amount of Carbon:</label>
      <input type="text" id="inputData" value={amount} onChange={changeAmount} /></ul>
      <ul><label>Date of Activity:</label>
      <input type="datetime-local" id="inputData" value={date} max={currDateTime} onChange={changeDate} /></ul>
      <button onClick={transferValue}> Confirm</button>
      </li></div>
  );
}

  
export default TransactionForm;