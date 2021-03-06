import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// if (process.env.NODE_ENV === "production") {
//   var storage = multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, path.resolve(__dirname, "/frontend/build"));
//     },
//     filename(req, file, cb) {
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   });
// } else {
//   var storage = multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, path.resolve(__dirname, "/uploads"));
//     },
//     filename(req, file, cb) {
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   });
// }

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/selectedFile", upload.single("selectedFile"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/avatar", upload.single("avatar"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
