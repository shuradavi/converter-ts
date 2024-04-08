import React, { useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, getCharCodesList } from '../functions/functions';
import CurrenciesForm from './CurrenciesForm'
import ExchangeRate from './ExchangeRate';
import WithModal from './WithModal';

export const ConverterSide = ({inputValue, onChangeValue, title, currencies, activeCurrencyName, secondCurrencyName, setActiveCurrencyName }) => {
	const [onPanelCurrencies, setOnPanelCurrencies] = useState(defaultCurrencies);
	const [isFormOpen, setForm] = useState(false);	// состояние формы


	const setFavoriteCurrencies = (CharCode) => {
		if (Boolean(currencies) && Boolean(currencies.length)) {
			const favoriteCurrencies = sortFavoriteCurrencies(currencies);
			const arrayOfFavoriteCharCodes = getCharCodesList(favoriteCurrencies);
			const isFavoriteListExistElement = Boolean(arrayOfFavoriteCharCodes.find(cur => cur === CharCode))
			if (!isFavoriteListExistElement) {
				arrayOfFavoriteCharCodes.splice(-1, 1, CharCode)
				setOnPanelCurrencies(arrayOfFavoriteCharCodes)
			}
		}
	}
	
	const onSelectClickHandler = () => {
		if (!isFormOpen) {
			setForm(true);
		}
	} 

	const closeForm = () => {
		if (isFormOpen) {
			setForm(false)
		}
	}

	const onPanelCurrencyClickHandler = (cur) => {
		setActiveCurrencyName(cur)
	}

	const selectCurrency = (item) => {
		setActiveCurrencyName(item.CharCode)
		setFavoriteCurrencies(item.CharCode)
		setForm(false)
	}
	return (
		<div className='converter-side'>
			<div className='side-title'>{title}</div>
			<div className='side-switcher'>
				{onPanelCurrencies.map((cur, idx) => (
					<div
						key={idx}
						onClick={() => onPanelCurrencyClickHandler(cur)}
						className={activeCurrencyName === cur ? 'side-switcher-item active' : 'side-switcher-item'}
					>
						{cur}
					</div>
				))}
				<WithModal isOpened={isFormOpen} onClose={closeForm} onSelectClickHandler={onSelectClickHandler}>
					<CurrenciesForm currencies={currencies} onCurrencyClickHandler={selectCurrency}/>
				</WithModal>
			</div>
			<div className='side-input-box'>
				<input className='input'
					onChange={event => onChangeValue(event.target.value)}
					value={inputValue}
					maxLength='10'
					type='number'
				/>
				{Boolean(currencies) && <ExchangeRate
					mainCurrency={currencies.find(cur => cur.CharCode === activeCurrencyName)}
					secondCurrency={currencies.find(cur => cur.CharCode === secondCurrencyName)}
				/>}
			</div>
		</div>
	);
};

export default ConverterSide;