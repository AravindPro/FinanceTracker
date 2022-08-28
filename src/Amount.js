import React, { useState, useEffect } from 'react';

let [date, setDate] = useState('');
let [amount, setAmount] = useState(0);

useEffect(()=>{
	setDate(date);
	setAmount(amount);
})

export default { date, amount};