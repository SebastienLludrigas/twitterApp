const router = require('express').Router();
const api = require('./api');
const Tweet = require('../database/models/tweet.model');

router.use('/api', api);

router.get('/tweet/new', (req, res) => {
   res.render('tweets/tweet-form');
});

router.get('/', async (req,res) => {
   // Tweet
   //    .find()
   //    .exec()
   //    .then((tweets) => {
   //       console.log(tweets)
   //       res.render('tweets/tweet-list', { tweets });
   //    })
   //    .catch(err => {
   //       console.log(err)
   //    });

   try {
      const tweets = await Tweet.find().exec();
      console.log(tweets)
      if (tweets) res.render('tweets/tweet-list', { tweets });
   } catch (err) {
      console.log(err);
   }
});

module.exports = router;