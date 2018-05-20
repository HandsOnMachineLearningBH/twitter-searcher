var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


async function searchByTweets(term, numberOfResults, results = [], params={include_entities: true, lang: 'pt', count: 10}) {
  if (numberOfResults > 0) {

    params.q = term;
    const tweets = await client.get('search/tweets', params);

    if (tweets) {
      const statuses = tweets.statuses;
      const metadata = tweets.search_metadata;

      if (metadata.count > 0) {
        for(let tweet of tweets.statuses) {
          const rowData = buildRowData(tweet);
          results.push(rowData);
        }

        numberOfResults -= statuses.length;
        params.max_id = metadata.max_id;

        return await searchByTweets(term, numberOfResults, results, params);
      } else {
        return results;
      }
    }
  } else {
    return results;
  }
}

function buildRowData(tweet) {
  let rowData = {};
  rowData.text = tweet.text;
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
  console.log("final result", results);

}



getTweets('Latam', 20);
