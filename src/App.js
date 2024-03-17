import React, { useState } from 'react'; 
import { getData } from './params/params';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const App =  () => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('')
	const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP']

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
	// unnamedFunc('UZS');
	// getData().then(res => console.log(Object.keys(res)))
	return (
		<div className='App'>
			<h1>Конвертер валют</h1>
			<div className='converter'>
				<div className='converter-box-wrapper'>
					<div className='converter-box'>
						<div className='converter-side'>
							<div className='side-title'>У меня есть</div>
							<div className='side-switcher'>
								<div className='side-switcher-item active'>RUB</div>
								<div className='side-switcher-item'>USD</div>
								<div className='side-switcher-item'>EUR</div>
								<div className='side-switcher-item'>GBP</div>
								<div className='side-switcher-item'><FontAwesomeIcon icon="fas fa-angle-down" /></div>
							</div>
							<div className='side-input-box'>
								<input className='input' placeholder='0' maxLength='10' type='text'/>
								<div className='side-input-box-rate'>курс валюты</div>
							</div>
						</div>
						<div className='converter-center'>SWITCH</div>
						<div className='converter-side'>
							<div className='side-title'></div>
							<div className='side-switcher'></div>
							<div className='side-input-box'>
								<input className='input' placeholder='0' maxLength='10' type='text'/>
								<div className='side-input-box-rate'>курс валюты</div>
							</div>
						</div>
					</div>
					{/* <div className='converter-body'>
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
					</div> */}
				</div>
				<div className='converter-footer'></div>
			</div>
		</div>
	);
};

export default App;