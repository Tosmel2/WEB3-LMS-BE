import express from 'express';
import * as Admin from '../controller/Admin/adminController.js';

const adminRoutes = express.Router();

adminRoutes.get('/admins', Admin.getAdmins);
adminRoutes.get('/admins/:id', Admin.getAdminById);
adminRoutes.get('/admins/:id/activities', Admin.getAdminActivities);

export default adminRoutes;
