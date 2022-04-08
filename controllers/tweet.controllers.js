const { getTweets, createTweet, deleteTweet, getTweet, updateTweet } = require('../queries/tweet.queries');

exports.tweetList = async (req, res, next) => {
   try {
      const tweets = await getTweets();
      // console.log(tweets)
      res.render('tweets/tweet', { tweets });
   } catch (err) {
      next(err);
   }
};

exports.tweetNew = (req, res, next) => {
   res.render('tweets/tweet-form', { tweet: {} });
};

exports.tweetCreate = async (req, res, next) => {
   try {
      const body = req.body;
      await createTweet(body);
      res.redirect('/tweets');
   } catch (err) {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message)
      // console.log(err);
      res.status(400).render('tweets/tweet-form', { errors });
   }
};

exports.tweetDelete = async (req, res, next) => {
   try {
      const tweetId = req.params.tweetId;
      await deleteTweet(tweetId);
      const tweets = await getTweets();
      res.render('tweets/tweet-list', { tweets });
   } catch (err) {
      next(err);
   }
}

exports.tweetEdit = async (req, res, next) => {
   try {
      const tweetId = req.params.tweetId;
      const tweet = await getTweet(tweetId);
      res.render('tweets/tweet-form.pug', { tweet });
   } catch (err) {
      next(err);
   }
};

exports.tweetUpdate = async (req, res, next) => {
   const body = req.body;
   const tweetId = req.params.tweetId;
   try {
      await updateTweet(tweetId, body);
      res.redirect('/tweets');
   } catch (err) {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message)
      const tweet = await getTweet(tweetId);
      res.status(400).render('tweets/tweet-form', { errors, tweet });
   }
};