import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = () => {
  const DAYS_LIMIT = 3
  const START_DATE = '2024-01-01'
  const FREQUENCY_OF_METRIC_INJECTION_PER_HOUR = 0.5 // Get metric every 30 minutes
  const FREQUENCY_OF_METRIC_INJECTION_PER_DAY = 24 / FREQUENCY_OF_METRIC_INJECTION_PER_HOUR

  const FREQUENCY_OF_METRIC_INJECTION_IN_MINUTES = FREQUENCY_OF_METRIC_INJECTION_PER_HOUR * 60

  const data = []

  for (let i = 0; i < (DAYS_LIMIT * FREQUENCY_OF_METRIC_INJECTION_PER_DAY); i++) {
    const currentDate = new Date(START_DATE)
    const datetime = new Date(new Date(currentDate).setMinutes(FREQUENCY_OF_METRIC_INJECTION_IN_MINUTES * i))

    data.push({ name: 'revenue', value: Math.random() * 300, datetime })
    data.push({ name: 'cost', value: Math.random() * 300, datetime })
  }

  return data
}

async function main() {
  await prisma.metrics.createMany({
    data: seedData()
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })