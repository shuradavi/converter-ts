import React, { useEffect, useState } from 'react'; 
import { getData } from './params/params';
import CurrenciesForm from './components/CurrenciesForm';

const App =  () => {
	const [inputValue, setInputValue] = useState('');	// входная сумма
	const [outputValue, setOutputValue] = useState('');	// сумма на выходе
	const [inputCurrency, setInputCurrency] = useState('RUR');	//  входная валюта
	const [inputSelect, setInputSelect] = useState(false);
	const [outputCurrency, setOutputCurrency] = useState('USD');	// валюта на выходе	
	const [isFormOpen, openForm] = useState(false);	// состояние модалки
	const [currencies, setCurrencies] = useState(null);	// курс валют
	let defaultCurrencies = ['RUR', 'USD', 'EUR', 'GBP'];	// валюты по умолчанию

	let exception = ['USD', 'EUR', 'GBP', 'VND', 'HKD', 'GEL', 'EGP', 'IDR', 'QAR', 'NZD', 'XDR', 'THB']
	
	useEffect(() => {
		getData()
			.then(res => {
				console.log('res', res);
				let defaultCurrencyArray = res.filter(item => item.CharCode === 'USD' || item.CharCode === 'EUR' || item.CharCode === 'GBP')
				defaultCurrencies.sort((a, b) => a.localeCompare(b))
				let currenciesArray = res.filter(item => !Boolean(exception.find((el) => {
					return el === item.CharCode
				})))
				currenciesArray.sort((a, b) => a.Name.localeCompare(b.Name));
				currenciesArray = [{ ID: 'R1', Name: 'Российский рубль', CharCode: 'RUR', Nominal: 1, NumCode: '001', Value: 1 },...defaultCurrencyArray, ...currenciesArray]
				console.log('ca > ', currenciesArray);
			setCurrencies(currenciesArray);
		})
	}, [])

	// VND, HKD, GEL, EGP, IDR, QAR, NZD, XDR, THB, 

	// + KRW, NOK, CZK, SEK, CHF, ZAR, JPY  
	
	
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

	const onSelectHandler = (e) => {
		e.stopPropagation()
		setInputSelect(currencies)
		openForm(prev => !prev)
		console.log('clicked arrow');
	}
	// unnamedFunc('UZS');
	// getData().then(res => console.log(Object.keys(res)))
	return (
		<div className='App' onClick={onSelectHandler}>
			{isFormOpen &&  <CurrenciesForm currencies={currencies}/>}
			<h1>Конвертер валют</h1>
			<div className='converter'>
				<div className='converter-box-wrapper'>
					<div className='converter-box'>
						<div className='converter-side'>
							<div className='side-title'>У меня есть</div>
							<div className='side-switcher'>
								{defaultCurrencies.map(item =>
									item !== inputCurrency ? <div key={item} className='side-switcher-item'>{item}</div> : <div key={item} className='side-switcher-item active'>{item}</div>)}
								<div className='side-switcher-item' onClick={e => onSelectHandler(e)}></div>
							</div>
							<div className='side-input-box'>
								<input className='input' placeholder='0' maxLength='10' type='number' onChange={onInputHandler}/>
								<div className='side-input-box-rate'>курс валюты</div>
							</div>
						</div>
						<div className='converter-center'>
							<div className='converter-center-reverse'></div>
						</div>
						<div className='converter-side'>
							<div className='side-title'>Хочу приобрести</div>
							<div className='side-switcher'>
							{defaultCurrencies.map(item =>
									item !== outputCurrency ? <div key={item} className='side-switcher-item'>{item}</div> : <div key={item} className='side-switcher-item active'>{item}</div>)}
								<div className='side-switcher-item'></div>
							</div>
							<div className='side-input-box'>
								<input className='input' placeholder='0' maxLength='10' type='number'/>
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