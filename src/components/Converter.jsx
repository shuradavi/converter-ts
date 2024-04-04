import React, { useEffect, useState } from 'react';
import ConverterSide from './ConverterSide';
import { getData, sortData } from '../functions/functions';



const Converter = () => {
	const [currencies, setCurrencies] = useState(null);	// курс валют
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
						<ConverterSide title='У меня есть'
							inputValue={fromValue}
							onChangeValue={onChangeFromValue}
							currencies={currencies}
							activeCurrencyName={fromCurrencyName}
							secondCurrencyName={toCurrencyName}
							setActiveCurrencyName={setFromCurrencyName}
						/>
						<div className='converter-center'>
							<div className='converter-center-reverse'></div>
						</div>
						<ConverterSide title='Хочу приобрести'
							inputValue={toValue}
							onChangeValue={onChangeToValue}
							currencies={currencies}
							activeCurrencyName={toCurrencyName}
							secondCurrencyName={fromCurrencyName}
							setActiveCurrencyName={setToCurrencyName}
						/>
					</div>
				</div>
			</div>	
		</>
	);
};

export default Converter;