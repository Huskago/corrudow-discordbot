const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  username: String,
  code: String,
  verified: { 'type': Boolean, 'default': false },
  group: String,
  level: { 'type': Number, 'default': 0 },
  exp: { 'type': Number, 'default': 0 },
  quests: [{ id: { 'type': mongoose.Types.ObjectId, 'default': 1 }, completed: { 'type': Boolean, 'default': false }, completedAt: { 'type': Date, 'default': Date.now() }, title: { 'type': String, 'default': "Le titre de la quête" }, description: { 'type': String, 'default': "La description de la quête" }, reward: { 'type': String, 'default': "100€" } }],
});

module.exports = mongoose.model('User', userSchema);