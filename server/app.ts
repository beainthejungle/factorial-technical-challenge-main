import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/metrics', async (req, res) => {
  const { name, value } = req.body

  const lastMetric = await prisma.metrics.findFirst({
    where: {
      name
    },
    orderBy: {
      datetime: 'desc'
    }
  })

  const lastDate = new Date(lastMetric?.datetime || '')

  // Add 30 minutes to the last metric date
  const datetime = new Date(lastDate.setMinutes((lastDate.getMinutes() + 30)))
  
  try {
    const metric = await prisma.metrics.create({
      data: {
        name,
        value,
        datetime
      }
    })
    res.json(metric)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

app.get('/api/metrics/:metric', async (req, res) => {
  try {
    const { metric } = req.params
    const { granularity } = req.query

    const result = await prisma.$queryRaw`
      SELECT
      date_trunc(${granularity}, datetime) AS day,
      CAST(AVG(value) AS integer) AS avg_value
    FROM
        "Metrics"
    WHERE name = ${metric}
    GROUP BY
        day
    ORDER BY
        day;`
    
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})
