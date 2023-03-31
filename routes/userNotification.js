import express from express
import authenticateToken from '../middleware/jwt.js'
import {getParticularNotification,getAllNotifications,deleteParticularNotification,clearNotifications} from '../controller/Notifications/userNotification.js'

const notifyRoute = express.Router();

notifyRoute.get('/allNotifications',authenticateToken,getAllNotifications)
notifyRoute.get('/viewOne',authenticateToken,getParticularNotification)
notifyRoute.delete('/deleteOne',authenticateToken,deleteParticularNotification)
notifyRoute.delete('/clearNotifications',authenticateToken,clearNotifications)

