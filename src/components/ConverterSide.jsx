import React, { useState } from 'react';
import { defaultCurrencies } from '../params/params';

const ConverterSide = ({ title, toggleForm }) => {
	const [inputCurrency, setInputCurrency] = useState('RUR');
	
	return (
		<div className='converter-side'>
			<div className='side-title'>{title}</div>
			<div className='side-switcher'>
				{defaultCurrencies.map(item =>
					item !== inputCurrency ?
						<div key={item} className='side-switcher-item'>{item}</div> :
						<div key={item} className='side-switcher-item active'>{item}</div>
				)}
				<div className='side-switcher-item' onClick={toggleForm}></div>
			</div>
			<div className='side-input-box'>
				<input className='input' placeholder='0' maxLength='10' type='number' />
				<div className='side-input-box-rate'>курс валюты</div>
			</div>
		</div>
	);
};

export default ConverterSide;