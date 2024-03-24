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
		.filter(item => item.CharCode === 'USD' || item.CharCode === 'EUR' || item.CharCode === 'GBP')
		.sort((a, b) => a.Name.localeCompare(b.Name));
	const otherCurrencies = data
		.filter(item => !exception.includes(item.CharCode))
		.sort((a, b) => a.Name.localeCompare(b.Name));
	return [RUR, ...favoriteCurrencies, ...otherCurrencies];
}