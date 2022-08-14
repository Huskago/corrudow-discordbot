const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
  id: String,
  username: String,
  code: String,
  verified: { 'type': Boolean, 'default': false },
  group: String,
  level: { 'type': Number, 'default': 0 },
  exp: { 'type': Number, 'default': 0 },
  quests: [{id: Number, completed: Boolean, completedAt: Date, title: String, description: String, reward: String}],
});

module.exports = mongoose.model('User', userSchema);