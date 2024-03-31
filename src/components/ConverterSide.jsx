import React, { useEffect, useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, setCurrenciesList  } from '../functions/functions';

export const ConverterSide = ({inputValue, onChangeValue, title, side,  openForm, closeForm, currencies, activeCurrency, setActiveCurrency }) => {
	const [onPanelCurrencies, setOnPanelCurrencies] = useState(defaultCurrencies);

	const removeClass = (e) => {		// Удаляем класс 'active' с селектора на панели валют
		if (!e.target.closest('.arrow')) {
			closeForm()
			const activeArrows = document.querySelectorAll('.arrow.active')
			activeArrows.forEach(el => el.classList.remove('active'))
		}
	}
	useEffect(() => {
		document.body.addEventListener('click', removeClass)
		if (currencies) {
			const favoriteCurrencies = sortFavoriteCurrencies(currencies);
			const arrayOfFavoriteCharCodes = setCurrenciesList(favoriteCurrencies);
		if (arrayOfFavoriteCharCodes.indexOf(activeCurrency) === -1) {
			arrayOfFavoriteCharCodes.splice(-1, 1, activeCurrency)
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
		} else {
			const indexOfRepeatedCharCode = arrayOfFavoriteCharCodes.indexOf(activeCurrency)
			arrayOfFavoriteCharCodes.splice(indexOfRepeatedCharCode, 1, activeCurrency)
			setOnPanelCurrencies(arrayOfFavoriteCharCodes);
			}
		}
		return () => document.body.removeEventListener('click', removeClass)
	}, [activeCurrency])

	const onSelectClickHandler = (e) => {
		const previousActiveArrowElement = document.querySelector('.arrow.active')
		if (previousActiveArrowElement) {
			previousActiveArrowElement.classList.remove('active')
		}
		const el = e.currentTarget
		el.classList.add('active')
		openForm(side)
	}

	const onPanelCurrencyClickHandler = (cur) => {
		setActiveCurrency(cur.target.textContent)
	}
	
	return (
		<div className='converter-side'>
			<div className='side-title'>{title}</div>
			<div className='side-switcher'>
				{onPanelCurrencies.map(cur => (
					<div
						key={cur}
						onClick={cur => onPanelCurrencyClickHandler(cur)}
						className={activeCurrency === cur ? 'side-switcher-item active' : 'side-switcher-item'}
					>
						{cur}
					</div>
				))}
				<div
					className='side-switcher-item arrow'
					onClick={e => onSelectClickHandler(e)}
				>
						{side}
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
					{`1 ${activeCurrency} = `}
				</div>
			</div>
		</div>
	);
};

export default ConverterSide;