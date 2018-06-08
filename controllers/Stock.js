const fs = require('fs')
const fetch = require('node-fetch')
const key = require('../config/alpha.config')

class Stock {
	static add(symbolName) {}

	static async fetch(symbolName) {
		const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolName}&apikey=${key}`
		const res = await fetch(url)
		const json = await res.json()

		if (json && json['Meta Data']) {
			let data = []
			let label = symbolName
			let labels = [] // x axis on chart (days)

			const dailySeries = json['Time Series (Daily)']
			for (let day in dailySeries) {
				data.push(dailySeries[day]['4. close'])
				labels.push(day)
			}

			// reverse arrays to make today last data on chart
			data = data.reverse()
			labels = labels.reverse()

			return {
				success: true,
				data: { label: label, data: data, labels: labels }
			}
		} else {
			return { success: false, error: 'Invalid symbol' }
		}
	}

	static isDuplicate(symbolName, file) {
		let json = this.read(file)
		let found = false

		json.stocks.forEach(stock => {
			if (stock.label === symbolName) {
				found = true
			}
		})

		return found
	}

	static write(file, json) {
		fs.writeFileSync(file, JSON.stringify(json), 'utf-8')
	}

	static read(file) {
		return JSON.parse(fs.readFileSync(file, 'utf-8'))
	}
}

module.exports = Stock
