const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

module.exports = storage;