const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
   content: {
      type: String,
      maxLength: [140, 'Tweet trop long'],
      minLength: [1, 'Tweet trop court'],
      required: [true, 'Champ requis']
   }
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;