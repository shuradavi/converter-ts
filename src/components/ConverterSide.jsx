import React, { useEffect, useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, setCurrenciesList  } from '../functions/functions';

export const ConverterSide = ({inputValue, onChangeValue, title, side,  openForm, closeForm, currencies, activeCurrencyName, setActiveCurrencyName }) => {
	const [onPanelCurrencies, setOnPanelCurrencies] = useState(defaultCurrencies);

	
	useEffect(() => {
		const removeClass = (e) => {		// Удаляем класс 'active' с селектора на панели валют
			if (!e.target.closest('.arrow')) {
				closeForm()
				const activeArrows = document.querySelectorAll('.arrow.active')
				activeArrows.forEach(el => el.classList.remove('active'))
			}
		}
		document.body.addEventListener('click', removeClass)
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
		return () => document.body.removeEventListener('click', removeClass)
	}, [activeCurrencyName])

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
		// setActiveCurrencyName(cur.target.textContent)
	}
	
	return (
		<div className='converter-side'>
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
					{/* {`1 ${activeCurrencyName} = `} */}
				</div>
			</div>
		</div>
	);
};

export default ConverterSide;