import multer from 'multer'
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("Unsupported file type!"));
        return;
      }
      cb(null, true);
    },
})
export default upload