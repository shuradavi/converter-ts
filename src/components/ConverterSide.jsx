import React, { useEffect, useRef, useState } from 'react';
import { defaultCurrencies } from '../params/params';
import { sortFavoriteCurrencies, setCurrenciesList } from '../functions/functions';
import CurrenciesForm from './CurrenciesForm'

function useOutsideAlerter(ref, state, setState) {
	useEffect(() => {
		function handleClickOutside(event) {
		  console.log('1st');
			if (ref.current && !ref.current.contains(event.target)) {

		}
	  }
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	  };
	}, [ref]);
  }

export const ConverterSide = ({inputValue, onChangeValue, title, currencies, activeCurrencyName, setActiveCurrencyName }) => {
	const [onPanelCurrencies, setOnPanelCurrencies] = useState(defaultCurrencies);
	const [isFormOpen, setForm] = useState(false);	// состояние формы

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	// useEffect(() => {
	// 	// const closeForm = (e) => {
	// 	// 	if (!e.target.closest('.active')) {
	// 	// 		console.log('clicked outside');
	// 	// 		if (isFormOpen) {
	// 	// 			setForm(false)
	// 	// 		}
	// 	// 	} 
	// 	// }
	// 	// document.body.addEventListener('click', closeForm)
	// 	// const removeClass = (e) => {		// Удаляем класс 'active' с селектора на панели валют
	// 	// 	if (!e.target.closest('.arrow')) {
	// 	// 		setForm(prev => !prev)
	// 	// 		const activeArrows = document.querySelectorAll('.arrow.active')
	// 	// 		activeArrows.forEach(el => el.classList.remove('active'))
	// 	// 	}
	// 	// }
	// 	if (currencies) {
	// 		const favoriteCurrencies = sortFavoriteCurrencies(currencies);
	// 		const arrayOfFavoriteCharCodes = setCurrenciesList(favoriteCurrencies);
	// 	if (arrayOfFavoriteCharCodes.indexOf(activeCurrencyName) === -1) {
	// 		arrayOfFavoriteCharCodes.splice(-1, 1, activeCurrencyName)
	// 		setOnPanelCurrencies(arrayOfFavoriteCharCodes);
	// 	} else {
	// 		const indexOfRepeatedCharCode = arrayOfFavoriteCharCodes.indexOf(activeCurrencyName)
	// 		arrayOfFavoriteCharCodes.splice(indexOfRepeatedCharCode, 1, activeCurrencyName)
	// 		setOnPanelCurrencies(arrayOfFavoriteCharCodes);
	// 		}
	// 	}
	// 	// return () => document.body.removeEventListener('click', closeForm)
	// }, [isFormOpen,activeCurrencyName])

	
	const onSelectClickHandler = () => {
		if (!isFormOpen) {
			setForm(true);
		}
	} 

	const onPanelCurrencyClickHandler = (cur) => {
		setActiveCurrencyName(cur.target.textContent)
	}


	
	
	
	return (
		<div className='converter-side'>
			{isFormOpen && <CurrenciesForm currencies={currencies}/>}
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