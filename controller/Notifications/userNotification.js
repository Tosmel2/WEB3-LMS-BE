import Notification from '../../model/notification.js'
import User from '../../model/user'

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient })
    res.json({
      status: 'Success',
      data: notifications,
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: 'An error occured while retrieving Notifications',
    })
  }
}

export const getParticularNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
    if (!notification) {
      return res.json({
        status: 'Error',
        message: 'Notification not found',
      })
    }
    res.json({
      status: 'Success',
      data: notification,
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: 'An error occured while retrieving this Notification',
    })
  }
}
export const deleteParticularNotification = async (req, req) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id,
    )
    if (!deletedNotification) {
      return res.json({
        status: 'Error',
        message: 'Notification not found',
      })
    }
    res.json({
      status: 'Success',
      message: 'Notification deleted successfully',
    })
  } catch (err) {
    console.error(err)
    res.json({
      status: 'Error',
      message: 'Internal Server Error',
    })
  }
}

export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({})
    res.json({
      status: 'Success',
      message: 'Notifications Cleared Successfully',
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: 'An error occured while clearing notifications',
    })
  }
}
