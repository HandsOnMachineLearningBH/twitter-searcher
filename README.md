# Twitter Search

Node: 8.9 +

## Settings

### Twitter credentials
Create a new app on Twitter Application Manager: https://apps.twitter.com/ and set these environment variables:

```
export TWITTER_CONSUMER_KEY=2qfExP35YexSeMKF4C1UluZTz
export TWITTER_CONSUMER_SECRET=l3tVaYayCcNFt0wgn5rkYJRqgdBDBL2AgdgJy7m7KGhmIDqj55
export TWITTER_ACCESS_TOKEN_KEY=649963731-YKd5uT7GEl8ZdSVr6CzYobnqOHXxB3bGrntrtK8L
export TWITTER_ACCESS_TOKEN_SECRET=1ZfcW8C2E1wLYDbq2Lap2Ra2SkqqzaWEO8LqU27COGpcG
```


### Google credentials
1. Create a new google application (https://console.cloud.google.com/home/dashboard)
2. Go to _APIs and services_ -> _Credentials_
3. Generate a new _Service Key_
4. Download the json file here with name `google.json`
5. Create a new spreadsheet and copy the id
6. Export this environment variable with the spreadsheet id:
```
export TWITTER_GOOGLE_SPREADSHEET_ID=1JfQjaJq5RcBMF-3xp8e0pc-bfs5DMlPUF-40d2vkRdc
```
7. Get the app email (from google console credentials) and shared the Spreadsheet with it


## Getting Started
`node index.js`
