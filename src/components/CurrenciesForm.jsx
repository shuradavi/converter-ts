import React from 'react';

const CurrenciesForm = ({ currencies }) => {
	
	return (
		<div className='calc-currency'>
			<div className='calc-currency-column'>{currencies.slice(0, 11).map((item) => {
				if (item.Name === 'Фунт стерлингов Соединенного королевства') {
					item.Name = 'Фунт стерлингов'
				}
				return (<div key={item.ID} className='calc-currency-row'>
					<div className='cacl-currency-name'>{item.Name}</div>
					<div className='cacl-currency-sign'>{item.CharCode}</div>
				</div>)
			} 
				)}
			</div>
			<div className='calc-currency-column calc-currency-column-center'>{currencies.slice(11, 22).map(item =>
				<div key={item.ID} className='calc-currency-row'>
					<div className='cacl-currency-name'>{item.Name}</div>
					<div className='cacl-currency-sign'>{item.CharCode}</div>
				</div>)}
			</div>
			<div className='calc-currency-column'>{currencies.slice(23, (currencies.length)).map(item =>
				<div key={item.ID} className='calc-currency-row'>
					<div className='cacl-currency-name'>{item.Name}</div>
					<div className='cacl-currency-sign'>{item.CharCode}</div>
				</div>)}
			</div>
		</div>
	);
};

export default CurrenciesForm;