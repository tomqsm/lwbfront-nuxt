const path = require('path')
const fs = require('fs')

const env = process.env.NODE_ENV

const envPath = path.resolve(process.cwd(), `.env.${env}`)
const defaultEnvPath = path.resolve(process.cwd(), '.env')

const env1 = require('dotenv').config({
  path: fs.existsSync(envPath) ? envPath : defaultEnvPath
})

export { env1 as default }
