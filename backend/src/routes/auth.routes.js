const express = require('express')
const router = express.Router()

// Send OTP
router.post('/send-otp', (req, res) => {
  const { phone } = req.body

  // Phone number check
  if (!phone) {
    return res.status(400).json({ error: 'Phone number required' })
  }

  // OTP generate karo (6 digit)
  const otp = Math.floor(100000 + Math.random() * 900000)
  
  console.log(`OTP for ${phone}: ${otp}`)

  res.json({
    success: true,
    message: 'OTP sent successfully',
    otp: otp // development mein dikhate hain
  })
})

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body

  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP required' })
  }

  // Abhi hardcode kar rahe hain — baad mein database se check karenge
  res.json({
    success: true,
    message: 'OTP verified successfully',
    token: 'sample-token-123'
  })
})

module.exports = router