import Admin from '../../model/Admin.js';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.lastActivity = Date.now();
    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
