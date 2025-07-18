import multer, { diskStorage } from "multer"

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only PDF and image files are allowed."))
    }
  },
})

export default upload
