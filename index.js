var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function getTweets(term, numberOfResults, params={q: term, include_entities: true, lang: 'pt', count: 10}) {

  if (numberOfResults > 0) {
    // https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
    client.get('search/tweets', params, function(error, tweets, response) {
      if (error) { console.error(error); }

      const statuses = tweets.statuses;
      const metadata = tweets.search_metadata;

      if (metadata.count > 0) {
        console.log(tweets.statuses[2]);
        console.log(metadata);

        numberOfResults -= tweets.statuses.length;

        params.max_id = metadata.max_id;
        getTweets(term, numberOfResults, params);
      }


    });
  }
}

getTweets('Latam', 20);
