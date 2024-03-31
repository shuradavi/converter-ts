import axios from "axios"
import {exception, RUR} from '../params/params'

export const getData = async () => {
	try {
		const response = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
		let data = response.data.Valute
		data = Object.values(data)
		return data
	} catch (error) {
		new Error('Error >>> ', error)
	}
}

export const sortData = (data) => {
	const favoriteCurrencies = data
		.filter(cur => cur.CharCode === 'USD' || cur.CharCode === 'EUR' || cur.CharCode === 'GBP')
		.sort((a, b) => a.Name.localeCompare(b.Name))
		.map(cur => {
			if (cur.Name === 'Фунт стерлингов Соединенного королевства') {
				cur.Name = 'Фунт стерлингов'
			} return cur
		})
	const otherCurrencies = data
		.filter(cur => !exception.includes(cur.CharCode))
		.sort((a, b) => a.Name.localeCompare(b.Name));
	return [RUR, ...favoriteCurrencies, ...otherCurrencies];
}

export const sortFavoriteCurrencies = (currencies) => {
	const favoriteCurrencies = currencies
		.filter(cur => cur.CharCode === 'USD' || cur.CharCode === 'EUR' || cur.CharCode === 'GBP')
		.sort((a, b) => a.Name.localeCompare(b.Name));
	return [RUR, ...favoriteCurrencies];
}

export const setCurrenciesList = (currencies) => {
	return currencies.map(cur => cur.CharCode)
}

// export const calculateConversionResult = (fromCurrency, toCurrency, inputValue) => {
// 	const sumFrom = fromCurrency.Value * fromCurrency.Nominal;
// 	const sumTo = toCurrency.Value * toCurrency.Nominal;
// 	const result = (sumFrom * inputValue) / sumTo;
// 	return result
// }