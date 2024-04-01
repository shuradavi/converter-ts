import React, { useEffect, useState } from 'react';
import ConverterSide from './ConverterSide';
import CurrenciesForm from './CurrenciesForm';
import { getData, sortData } from '../functions/functions';
import { sideInitialValue } from '../params/params';


const Converter = () => {
	const [isFormOpen, setForm] = useState(false);	// состояние формы валют
	const [currencies, setCurrencies] = useState(null);	// курс валют
	const [currentSide, setCurrentSide] = useState(sideInitialValue) // принадлежность открытой формы с валютами левой или правой части
	const [fromCurrencyName, setFromCurrencyName] = useState('RUR');	//  валюта from
	const [toCurrencyName, setToCurrencyName] = useState('USD');	//  валюта to
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
	}, [fromCurrencyName])

	useEffect(() => {
		onChangeFromValue(fromValue)
	}, [toCurrencyName])
	
	const openForm = (side) => {
		setCurrentSide(side)
		!isFormOpen && setForm(true)
	}

	const closeForm = (e) => {
		setForm(false)
	}
	const selectCurrencyFromForm = (e) => {
		currentSide === 'from'
			?	setFromCurrencyName(e.currentTarget.children[1].textContent)
			:	setToCurrencyName(e.currentTarget.children[1].textContent)
		setCurrentSide(sideInitialValue)
		closeForm()
	}

	const onChangeFromValue = (value) => {
		if (Boolean(currencies)) {
			const fromCurrencyRate = currencies.find(cur => cur.CharCode === fromCurrencyName);
			const toCurrencyRate = currencies.find(cur => cur.CharCode === toCurrencyName);
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
			const fromCurrencyRate = currencies.find(cur => cur.CharCode === fromCurrencyName);
			const toCurrencyRate = currencies.find(cur => cur.CharCode === toCurrencyName);
			const rateFrom = fromCurrencyRate.Value / fromCurrencyRate.Nominal; //		Курс входящей валюты к рублю
			const rateTo = toCurrencyRate.Value / toCurrencyRate.Nominal;
			const result = value * (rateTo / rateFrom)
				Number.isInteger(result)
				?	setFromValue(result)
				:	setFromValue(result.toFixed(4))
			setToValue(value); 
		}
	}

	const calcExchangeRate = (toCurrencyName, fromCurrencyName, currencies) => {
		// const fromCurrency
	}

	calcExchangeRate(fromCurrencyName)
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
							activeCurrencyName={fromCurrencyName}
							setActiveCurrencyName={setFromCurrencyName}
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
							activeCurrency={toCurrencyName}
							setActiveCurrency={setToCurrencyName}
						/>
					</div>
					{isFormOpen && <CurrenciesForm currencies={currencies} selectCurrency={selectCurrencyFromForm}/>}
				</div>
			</div>	
		</>
	);
};

export default Converter;