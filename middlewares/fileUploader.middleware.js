const multer = require("multer");

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      const type = file.mimetype.split("/")[1];
      const types = ["jpg", "png", "jpeg"];
      if (type !== types[0] && type !== types[1] && type !== types[2]) {
        cb(
          new Error(
            `unknown file type, valid types: ${types[0]}, ${types[1]}, ${types[2]}`
          )
        );
      }
      cb(null, `${"avatar-" + req.user + "." + type}`);
    },
  });
  return multer({ storage }).single("avatar");
};

module.exports = {
  avatarUpLoaderMiddleware: avatarUploader(),
};
