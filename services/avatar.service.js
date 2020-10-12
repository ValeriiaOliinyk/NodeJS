const AvatarGenerator = require("avatar-generator");
const UserDB = require("../api/users/users.model");
const { partsLocationGenerator, avatarPathGenerator } = require("./config");
const path = require("path");

const createAvatar = async (id) => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: partsLocationGenerator(),
    imageExtension: ".png",
  });
  const variant = "female";
  const image = await avatar.generate("email@example.com", variant);
  image.png().toFile(avatarPathGenerator(id));
};

const updateUserAvatar = async (id) => {
  const avatarUrl = `${
    process.env.HOST + ":" + process.env.PORT
  }/images/${id}.png`;

  return await UserDB.updateUser(id, { avatarURL: avatarUrl });
};

module.exports = {
  createAvatar,
  updateUserAvatar,
};
