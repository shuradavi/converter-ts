import React, { useEffect, useState } from 'react'; 
import Converter from './components/Converter';

const App =  () => {
	// const [inputValue, setInputValue] = useState('');	// входная сумма
	// const [outputValue, setOutputValue] = useState('');	// сумма на выходе
	
	// const [inputSelect, setInputSelect] = useState(false);
	

	
	
	// useEffect(() => {
	// 	getData()
	// 		.then(res => {
	// 			const resultArray = sortData(res);
	// 			setCurrencies(resultArray);
	// 		})
	// }, [])

	// VND, HKD, GEL, EGP, IDR, QAR, NZD, XDR, THB, 

	// + KRW, NOK, CZK, SEK, CHF, ZAR, JPY  
	// const onSelectClickHandler = () => {
		
	// }
	
	// const unnamedFunc = async (cur) => {
	// 	let currencies = await getData()
	// 	console.log(currencies);
	// 	let ratio = await currencies[cur].Nominal / currencies[cur].Value
	// 	let result = ratio * inputValue;
	// 	result = result.toFixed(2)
	// 	if (result) {
	// 		setOutputValue(result);
	// 	}
	// }
	// const onInputHandler = (event) => {
	// 	setInputValue(event.target.value)
	// }
	// const onInputCurrencyHandler = (event) => {
	// 	setInputCurrency(event.target.value)
	// 	console.log('clicked on input', event.target.value);
	// }

	// const onOutputCurrencyHandler = (event) => {
	// 	setOutputCurrency(event.target.value)
	// 	console.log('clicked on output', event.target.value);
	// }

	// const onSelectHandler = (e) => {
	// 	e.stopPropagation()
	// 	setInputSelect(currencies)
	// 	openForm(prev => !prev)
	// 	console.log('clicked arrow');
	// }
	
	return (
		<div className='App' >
			{/* {isFormOpen &&  <CurrenciesForm currencies={currencies}/>} */}
			<Converter />
		</div>
	);
};

export default App;