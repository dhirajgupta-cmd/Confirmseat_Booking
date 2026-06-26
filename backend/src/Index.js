const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: '🚂 ConfirmSeat API is running!',
    version: '1.0.0',
    status: 'ok',
    endpoints: {
      auth: '/api/auth',
    }
  })
})

// Server Start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ ConfirmSeat Server running on port ${PORT}`)
})