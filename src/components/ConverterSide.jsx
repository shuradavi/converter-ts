import React, { useEffect, useRef, useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, setCurrenciesList } from '../functions/functions';
import CurrenciesForm from './CurrenciesForm'

export const ConverterSide = ({inputValue, onChangeValue, title, currencies, activeCurrencyName, setActiveCurrencyName }) => {
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
			console.log('aofcc: >>>', arrayOfFavoriteCharCodes);
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
		} else {
			const indexOfRepeatedCharCode = arrayOfFavoriteCharCodes.indexOf(activeCurrencyName)
			arrayOfFavoriteCharCodes.splice(indexOfRepeatedCharCode, 1, activeCurrencyName)
			console.log('aofcc: >>>', arrayOfFavoriteCharCodes);
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
			}
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		console.log('useEffect at ConvertSide');
		// setFavoriteCurrencies()
		return () => document.body.removeEventListener('mousedown', handleClickOutside)
	}, [ activeCurrencyName])

	
	const onSelectClickHandler = () => {
		if (!isFormOpen) {
			setForm(true);
		}
	} 

	const onPanelCurrencyClickHandler = (cur) => {
		setActiveCurrencyName(cur.target.textContent)
	}

	const selectCurrency = (e) => {
		console.log('event: >>>', e);
		setActiveCurrencyName(e.currentTarget.children[1].textContent)
		setForm(false)
	}

	return (
		<div className='converter-side'>
			{isFormOpen && <CurrenciesForm currencies={currencies} selectCurrency={selectCurrency} />}
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
					ref={wrapperRef}
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
				<div className='side-input-box-rate'>
					{/* {`1 ${activeCurrencyName} = `} */}
				</div>
			</div>
		</div>
	);
};

export default ConverterSide;