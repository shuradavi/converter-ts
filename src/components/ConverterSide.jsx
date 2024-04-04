import React, { useEffect, useRef, useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, setCurrenciesList } from '../functions/functions';
import CurrenciesForm from './CurrenciesForm'
import ExchangeRate from './ExchangeRate';

export const ConverterSide = ({inputValue, onChangeValue, title, currencies, activeCurrencyName, secondCurrencyName, setActiveCurrencyName }) => {
	const [onPanelCurrencies, setOnPanelCurrencies] = useState(defaultCurrencies);
	const [isFormOpen, setForm] = useState(false);	// состояние формы
	const wrapperRef = useRef(null);
	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setForm(false)
		}
	}

	const setFavoriteCurrencies = () => {
		if (currencies) {
			const favoriteCurrencies = sortFavoriteCurrencies(currencies);
			const arrayOfFavoriteCharCodes = setCurrenciesList(favoriteCurrencies);
		if (arrayOfFavoriteCharCodes.indexOf(activeCurrencyName) === -1) {
			arrayOfFavoriteCharCodes.splice(-1, 1, activeCurrencyName)
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
		} else {
			const indexOfRepeatedCharCode = arrayOfFavoriteCharCodes.indexOf(activeCurrencyName)
			arrayOfFavoriteCharCodes.splice(indexOfRepeatedCharCode, 1, activeCurrencyName)
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
			}
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		console.log('useEffect at ConvertSide');
		setFavoriteCurrencies()
		return () => document.body.removeEventListener('mousedown', handleClickOutside)
	}, [isFormOpen])
	
	const onSelectClickHandler = () => {
		if (!isFormOpen) {
			setForm(true);
		}
	} 

	const onPanelCurrencyClickHandler = (cur) => {
		setActiveCurrencyName(cur.target.textContent)
	}

	const selectCurrency = (e) => {
		setActiveCurrencyName(e.currentTarget.children[1].textContent)
		setForm(false)
	}

	return (
		<div className='converter-side'>
			<div ref={wrapperRef}>
				{isFormOpen && <CurrenciesForm  currencies={currencies} onCurrencyClickHandler={selectCurrency} />}
			</div>
			<div className='side-title'>{title}</div>
			<div className='side-switcher'>
				{onPanelCurrencies.map((cur, idx) => (
					<div
						key={idx}
						onClick={cur => onPanelCurrencyClickHandler(cur)}
						className={activeCurrencyName === cur ? 'side-switcher-item active' : 'side-switcher-item'}
					>
						{cur}
					</div>
				))}
				<div
					// ref={wrapperRef}
					className={isFormOpen ? 'side-switcher-item arrow active' : 'side-switcher-item arrow'}
					onClick={onSelectClickHandler}
				>
				</div>
			</div>
			<div className='side-input-box'>
				<input className='input'
					onChange={event => onChangeValue(event.target.value)}
					value={inputValue}
					maxLength='10'
					type='number'
				/>
				{currencies && <ExchangeRate
					mainCurrency={currencies.find(cur => cur.CharCode === activeCurrencyName)}
					secondCurrency={currencies.find(cur => cur.CharCode === secondCurrencyName)}
				/>}
			</div>
		</div>
	);
};

export default ConverterSide;