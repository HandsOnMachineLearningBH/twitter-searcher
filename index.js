const Twitter = require('twitter');
const GoogleSave = require('./google.js');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const defaultParams = {
  result_type: 'recent',
  include_entities: true,
  lang: 'pt',
  count: 100,
  tweet_mode: 'extended'
}

async function searchByTweets(term, numberOfResults, results=[], params=defaultParams) {
  if (numberOfResults > 0) {
    params.q = term;
    const tweets = await client.get('search/tweets', params);
    const statuses = tweets.statuses;
    const metadata = tweets.search_metadata;

    for(let tweet of statuses) {
      if(numberOfResults <= 0) break;
      const rowData = buildRowData(tweet);
      results.push(rowData);
      numberOfResults--;
    }

    params.max_id = metadata.max_id;

    return await searchByTweets(term, numberOfResults, results, params);
  } else {
    return results;
  }
}

function buildRowData(tweet) {
  let rowData = {};

  rowData.text = tweet.full_text;
  rowData.truncated = tweet.truncated;
  rowData.retweetCount = tweet.retweet_count;
  rowData.favoriteCount = tweet.favorite_count;
  rowData.lang = tweet.lang;

  const entities = tweet.entities;
  rowData.hashtagsCount = entities.hashtags.length;
  rowData.mentionsCount = entities.user_mentions.length;
  rowData.urlsCount = entities.urls.length;

  const user = tweet.user;
  rowData.userScreenName = user.screen_name;
  rowData.userName = user.name;
  rowData.userLocation = user.location;
  rowData.userFollowers = user.followers_count;
  rowData.userFriends = user.friends_count;
  rowData.userFavorites = user.favourites_count;
  rowData.userStatusesCount = user.statuses_count;

  return rowData;
}

async function getTweets(term, maxResults) {
  const results = await searchByTweets(term, maxResults);
  GoogleSave.saveOnGoogle(results);
}

const SEARCH_TERM = 'LATAM_BRA';
const TWEETS_QUANTITY = 3000;

getTweets(SEARCH_TERM, TWEETS_QUANTITY);
