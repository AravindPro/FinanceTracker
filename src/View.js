import './View.css';
import React, { useState, } from 'react';

const nextDt = (date) => {
	date = new Date(date);
	date.setDate(date.getDate() + 1)
	return (date.toISOString().slice(0, 10));
}
const View = ()=>{
	let [datei, setDatei] = useState(0);
	let [datef, setDatef] = useState(0);
	let req = fetch('http://localhost:2000/bank')
		.then(res => res.json())
		.catch(err => console.log(err));

	let [amount, setAmount] = useState([]);
	let [total, setTotal] = useState(0);
	let [isSet, setisSet] = useState(false);
	const getVal = ()=>{
		req.then((json)=>{
			let sum = 0;
			let i = datei;
			let seta = [];
			while(i !== nextDt(datef))
			{
				let amt = json[i];
				if(amt != undefined)
					sum += amt;
				//Main logic
				seta.push(`${i}\t${amt}`);
				i = nextDt(i);
			}
			console.log(seta);
			amount = seta;
			setAmount(seta);

			total = sum;
			setTotal(sum);
			setisSet(true);
		});


	};
	const set = ()=>{
		setAmount(['3frh2ujb', 'bwuegei'])
	}
	return(
		<div className='viewMoney'>
			<div className="inputs">
				<input type="date" name="viewDate" id="datei" value={datei} onChange={(e)=>{datei=e.target.value; setDatei(e.target.value); setDatef(datei)}}/>
				<input type="date" name="viewDate" id="datef" value={datef} onChange={(e)=>{datef=e.target.value; setDatef(e.target.value)}}/>
				<button onClick={getVal}>Submit</button>
			</div>
			<div className="out">
				<ol>
					{amount.map((i)=>
						<li className="amounts" key={`amt${i}`}>{i}</li>
					)}
				</ol>
				{ isSet && <div className="total">Total: { total }</div>}
			</div>
		</div>
	);
}

export default View;