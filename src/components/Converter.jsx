import React, { useEffect, useState } from 'react';
import ConverterSide from './ConverterSide';
import CurrenciesForm from './CurrenciesForm';
import { getData, sortData } from '../functions/functions';


const Converter = () => {
	const [isFormOpen, setForm] = useState(false);	// состояние модалки
	const [currencies, setCurrencies] = useState(null);	// курс валют

	useEffect(() => {
		getData()
			.then(res => {
				const resultArray = sortData(res);
				setCurrencies(resultArray);
			})
	}, [])

	const toggleForm = () => {
		setForm(prev => !prev)
	}
	const onCurrencyClickHandler = (e) => {
		e.stopPropagation()
		console.log(e.currentTarget);
	}


	return (
		<>		
			<h1>Конвертер валют</h1>
			<div className='converter'>
				<div className='converter-box-wrapper'>
					<div className='converter-box'>
						<ConverterSide title='У меня есть' toggleForm={toggleForm}/>
						<div className='converter-center'>
							<div className='converter-center-reverse'></div>
						</div>
						<ConverterSide title='Хочу приобрести' toggleForm={toggleForm}/>
					</div>
					{isFormOpen && <CurrenciesForm currencies={currencies} onCurrencyClickHandler={onCurrencyClickHandler}/>}
				</div>
			</div>	
		</>
	);
};

export default Converter;