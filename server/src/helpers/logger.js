import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
const { combine, printf, timestamp } = format

const logFormat = printf(({ level, message, label, timestamp }) => {
    return ` ${level}: ${message} ${timestamp}`
})
const logger = winston.createLogger({
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.Console()
    ]
});
logger.configure({
    level: 'verbose',
    transports: [
        new DailyRotateFile({
            filename: path.join(__dirname, '../../logs/error.log')
        })
    ]
})

export default logger