import React, { useEffect, useState } from 'react';
import ConverterSide from './ConverterSide';
import CurrenciesForm from './CurrenciesForm';
import { getData, sortData } from '../functions/functions';
import { sideInitialValue } from '../params/params';


const Converter = () => {
	const [isFormOpen, setForm] = useState(false);	// состояние формы валют
	const [currencies, setCurrencies] = useState(null);	// курс валют
	const [currentSide, setCurrentSide] = useState(sideInitialValue) // принадлежность открытой формы с валютами левой или правой части
	const [fromCurrency, setFromCurrency] = useState('RUR');	//  валюта from
	const [toCurrency, setToCurrency] = useState('USD');	//  валюта to
	const [fromValue, setFromValue] = useState('')
	const [toValue, setToValue] = useState('')

	useEffect(() => {
		getData()
			.then(res => {
				const resultArray = sortData(res);
				setCurrencies(resultArray);
			})
	}, [])
	useEffect(() => {
		onChangeFromValue(fromValue)
	}, [fromCurrency])

	useEffect(() => {
		onChangeToValue(toValue)
	}, [toCurrency])
 
	const openForm = (side) => {
		setCurrentSide(side)
		!isFormOpen && setForm(true)
	}

	const closeForm = (e) => {
		setForm(false)
	}
	const selectCurrencyFromForm = (e) => {
		currentSide === 'from' ?
		setFromCurrency(e.currentTarget.children[1].textContent) :
		setToCurrency(e.currentTarget.children[1].textContent)
		setCurrentSide(sideInitialValue)
		closeForm()
	}

	const onChangeFromValue = (value) => {
		if (Boolean(currencies)) {
			const fromCurrencyRate = currencies.find(cur => cur.CharCode === fromCurrency);
			const toCurrencyRate = currencies.find(cur => cur.CharCode === toCurrency);
			const rateFrom = fromCurrencyRate.Value / fromCurrencyRate.Nominal; //		Курс входящей валюты к рублю
			const rateTo = toCurrencyRate.Value / toCurrencyRate.Nominal;
			const result = value * (rateFrom / rateTo)
				Number.isInteger(result)
				?	setToValue(result)
				:	setToValue(result.toFixed(4))
			setFromValue(value); 
		}
	}

	const onChangeToValue = (value) => {
		if (Boolean(currencies)) {
			const fromCurrencyRate = currencies.find(cur => cur.CharCode === fromCurrency);
			const toCurrencyRate = currencies.find(cur => cur.CharCode === toCurrency);
			const rateFrom = fromCurrencyRate.Value / fromCurrencyRate.Nominal; //		Курс входящей валюты к рублю
			const rateTo = toCurrencyRate.Value / toCurrencyRate.Nominal;
			const result = value * (rateTo / rateFrom)
				Number.isInteger(result)
				?	setFromValue(result)
				:	setFromValue(result.toFixed(4))
			setToValue(value); 
		}
	}

	return (
		<>		
			<h1>Конвертер валют</h1>
			<div className='converter'>
				<div className='converter-box-wrapper'>
					<div className='converter-box'>
						<ConverterSide title='У меня есть' side='from'
							inputValue={fromValue}
							onChangeValue={onChangeFromValue}
							openForm={openForm}
							closeForm={closeForm}
							currencies={currencies}
							activeCurrency={fromCurrency}
							directQuote
							setActiveCurrency={setFromCurrency}
						/>
						<div className='converter-center'>
							<div className='converter-center-reverse'></div>
						</div>
						<ConverterSide title='Хочу приобрести' side='to'
							inputValue={toValue}
							onChangeValue={onChangeToValue}
							openForm={openForm}
							closeForm={closeForm}
							currencies={currencies}
							activeCurrency={toCurrency}
							setActiveCurrency={setToCurrency}
						/>
					</div>
					{isFormOpen && <CurrenciesForm currencies={currencies} selectCurrency={selectCurrencyFromForm}/>}
				</div>
			</div>	
		</>
	);
};

export default Converter;