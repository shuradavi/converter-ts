import axios from "axios"

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