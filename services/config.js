const path = require("path");

const partsLocationGenerator = () => path.join(__dirname, "../img");
const avatarPathGenerator = (id) => `public/images/${id}.png`;

module.exports = {
  partsLocationGenerator,
  avatarPathGenerator,
};
