const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {        

        const token = req.headers.authorization.split(' ')[1] // 'Bearer token'
        
        if (!token) {
            res.status(401).json({ message: 'No autorization' })
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    } catch (error) {
        console.log('ERROR catch');
        res.status(401).json({ message: 'No autorization' })
    }
} 