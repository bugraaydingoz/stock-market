const express = require('express')
const app = express()
const io = require('socket.io')(app)
const path = require('path')
const Stock = require('./controllers/Stock')

const storeFile = './store/store.json'

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')))

// enable cors
var corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	exposedHeaders: ['x-auth-token']
}
app.use(cors(corsOption))

//rest API requirements
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(bodyParser.json())

io.on('connection', socket => {
	console.log('a user connected')

	let storeJson = Stock.read(storeFile)

	socket.emit('connection', storeJson)

	socket.on('add stock', async symbol => {
		symbol = symbol.toUpperCase()
		console.log('trying to add', symbol)

		try {
			if (Stock.isDuplicate(symbol, storeFile) || symbol.length < 1)
				throw new Error('Duplicate or invalid symbol')

			let data = await Stock.fetch(symbol)

			if (!data.success) throw new Error('Given symbol not found')
			io.emit('new stock', data.data)
		} catch (error) {
			console.log(error)
			socket.emit('response message', error.message)
		}
	})

	socket.on('remove stock', symbol => {
		symbol = symbol.toUpperCase()
		console.log('trying to remove', symbol)
		io.emit('remove stock', symbol)
	})

	socket.on('save stocks', json => {
		Stock.write(storeFile, json)
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// const ioPort = process.env.port || 8001
// io.listen(ioPort)
// console.log('IO listening on port ', ioPort)

const appPort = process.env.port || 4000
app.listen(appPort)
console.log('server running at ', appPort)

module.exports = app
