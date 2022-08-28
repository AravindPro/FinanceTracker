import './Update.css';
import { useEffect, useState } from 'react';

function Update() {

  let date = new Date();
  let [date_str, setDate] = useState(date.toISOString().slice(0, 10));
  let req = fetch('http://localhost:2000/bank')
              .then(res => res.json())
              .catch(err => console.log(err));
  
  let [spent, setSpent] = useState("0");
          
  const oldamt = () => {
    return fetch('http://localhost:2000/bank')
      .then(res => res.json())
      .then(doc => String(doc[date_str]) === 'undefined' ? 0 : Number(doc[date_str])
      )
      .catch(err => console.log(err));
  }
  const addJSON = (jn, ele) => {
    jn = JSON.stringify(jn);
    jn = jn.slice(0, -1) + ',' + ele + '}';
    return JSON.parse(jn);
  }

  const sumUp = (strg) => {
    let total = strg
                  .split(' ')
                  .map(a => Number(a))
                  .reduce((a, b) => a+b);

    return total
  }
  
  const update_value = (total, date)=>{
      //Get New JSON
      req
        .then(jstext => {
          let isPresent = String(jstext[date]) != 'undefined';
          console.log(isPresent);
          if (isPresent)
            jstext[date] = total;
          else
            jstext = addJSON(jstext, `"${date}": ${total}`);
          return jstext;
        })
        .then(newjs => {
          // POST COMMAND
          fetch('http://localhost:2000/bank', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(newjs)
            })
          });
  }

  const today_update = (total)=>{
    update_value(total, date_str)
  }

  const addVal = (date_str)=>{

    let total = sumUp(spent);
    console.log(total);
    oldamt().then(val => {
      update_value(total + Number(val), date_str)})
  }

  const Replace = (date_str)=>{
    let total =  sumUp(spent);
    console.log(total);
    console.log(date_str)
    update_value(total, date_str);
  }
  
  return (
    <div className="task flex-container">
      <div className="inp-info">Spent</div>
      <form action="">
        <label htmlFor="html">Date:</label>
        <input type="date" id='date' value={date_str} onChange={(e)=>{ date_str = e.target.value; setDate(e.target.value);}}/>
        <label htmlFor="html">Spent:</label>
        <input type="text" value={spent} onChange={(e) => { date_str = e.target.value; setSpent(e.target.value)}}/>
        <button type="submit" onClick={()=>{Replace(date_str)}}>Update</button>
        <button type="submit" onClick={()=>{addVal(date_str)}}>Add</button>
      </form>
    </div>
  );
}
export default Update;
