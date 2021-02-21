const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const https = require('https')

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        const options = {
            cert: fs.readFileSync('./sslcert/fullchain.pem'),
            key: fs.readFileSync('./sslcert/privkey.pem')
        };
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
        https.createServer(options, app).listen(443);
    } catch (error) {
        console.log('Server error', error.message)
        process.exit(1)
    }

}

start()

