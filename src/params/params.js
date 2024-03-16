import axios from "axios"

export const getData = async () => {
	const data = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
	const result = data.data.Valute
	return result
}

export const currenciesMap = getData()