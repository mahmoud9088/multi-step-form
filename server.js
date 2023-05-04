const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/api/form-data', (req, res) => {
  console.log(req.body)
  res.status(200).send({ message: 'successfully submitting!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
