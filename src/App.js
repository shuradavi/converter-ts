import React, { useState } from 'react'; 
import { getData } from './params/params';

const App =  () => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('')
	const [inputCurrency, setInputCurrency] = useState('RUB')
	const [outputCurrency, setOutputCurrency] = useState('USD')
	
	const unnamedFunc = async (cur) => {
		let currencies = await getData()
		console.log(currencies);
		let ratio = await currencies[cur].Nominal / currencies[cur].Value
		let result = ratio * inputValue;
		result = result.toFixed(2)
		if (result) {
			setOutputValue(result);
		}
	}
	const onInputHandler = (event) => {
		setInputValue(event.target.value)
	}
	const onInputCurrencyHandler = (event) => {
		setInputCurrency(event.target.value)
		console.log('clicked on input', event.target.value);
	}

	const onOutputCurrencyHandler = (event) => {
		setOutputCurrency(event.target.value)
		console.log('clicked on output', event.target.value);
	}
	unnamedFunc('UZS');
	return (
		<div>
			<div className='converter-wrapper'>
				<div className='converter-header'>
					<h1>Конвертер валют</h1>
				</div>
				<div className='converter-body'>
					<div className='input-currency'>
						<button value={'RUB'} onClick={onInputCurrencyHandler}>RUB</button>
						<button value={'USD'} onClick={onInputCurrencyHandler}>USD</button>
						<button value={'EUR'} onClick={onInputCurrencyHandler}>EUR</button>
					</div>
					<div className='input-value'>
						<input onChange={onInputHandler} value={inputValue} autoFocus/>
						<div className=''>руб.</div>
					</div>
					<div>{`->`}</div>
					<div className='output-value'>
					<div className='output-currency'>
						<button value={'RUB'} onClick={onOutputCurrencyHandler}>RUB</button>
						<button value={'USD'} onClick={onOutputCurrencyHandler}>USD</button>
						<button value={'EUR'} onClick={onOutputCurrencyHandler}>EUR</button>
					</div>
						<input value={outputValue} readOnly/>
						<div className=''>дол.</div>
					</div>
				</div>
				<div className='converter-footer'></div>
			</div>
		</div>
	);
};

export default App;