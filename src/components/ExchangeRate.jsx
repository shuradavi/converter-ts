import React from 'react';

const ExchangeRate = ({mainCurrency, secondCurrency}) => {

	// console.log(mainCurrency, secondCurrency);
	// const getExchangeRate = (mainCurrency, secondCurrency) => {
	// 	const result = (secondCurrency.Nominal / secondCurrency.Value) / (mainCurrency.Nominal / mainCurrency.Value)
	// 	return Number.isInteger(result)
	// 		?  result
	// 		:	result.toFixed(4)
	// }
	// const exchangeRateValue =  getExchangeRate(mainCurrency, secondCurrency)
	return (
		<div className='side-input-box-rate'>
					{/* {`1 ${mainCurrency.CharCode} = ${exchangeRateValue} ${secondCurrency.CharCode}`} */}
		</div>
	);
};

export default ExchangeRate;