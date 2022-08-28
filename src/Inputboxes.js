import React, { useState } from 'react';

const Inputboxes = (props)=>{
	let [date, setDate] = useState();
	let [text, setText] = useState();

	return(
		<form class="flex-container">
			<label>{props.dateLabel}</label>
			{props.date && <input type="date" value={date} name="date" id="date" onChange={ (e)=>{ date=e.target.value; setDate(date); } }/> }
			<label> {props.textLabel} </label>
			{ props.text && <input type="text" value={text} name="text" id="text" onChange={ (e)=>{ text=e.target.value; setText(text); } }/> }
			<input type="submit" value="Submit" />
		</form>
	);
}

export default {Inputboxes, date, text};