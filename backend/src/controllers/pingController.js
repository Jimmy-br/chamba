const getPing = (req, res) => {
  res.json({ msg: "pong" });
};

module.exports = { getPing };