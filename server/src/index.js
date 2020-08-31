import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import cluster from 'cluster'
import logger from './helpers/logger'
import appRoutes from './routes'

const app = express()
const numCPUs = require('os').cpus().length;
const port = process.env.PORT || 9000
const DEV = process.env.DEV || false


if (!DEV && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        if (signal) {
            logger.error(`worker was killed by signal: ${signal}`)
        } else if (code !== 0) {
            logger.error(`worker exited with error code: ${code}`)
        }
    });
}
else {
    console.log(`Worker ${process.pid} is running`)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(morgan('tiny'))
    appRoutes(app)
    app.get('/health', (request, response) => {
        response.status(200).send({
            status: 'ok'
        })
    })
    app.get('/getkml', (request, response) => {
        response.sendFile(path.join(__dirname, './config/points.kml'))
    })
    app.listen(port, () => console.log(`Sever running on port ${port}!`))
}