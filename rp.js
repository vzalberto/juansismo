var Twit = require('twit')

var t = new Twit({
    
        consumer_key : process.env.CONSUMER_KEY 
        , consumer_secret : process.env.CONSUMER_SECRET 
        , access_token: process.env.ACCESS_TOKEN
        , access_token_secret: process.env.ACCESS_TOKEN_SECRET
    
    })

function isThisRT(tuit){
        if(tuit.indexOf("RT ") == 0)
            return true;
        else
            return false;
        }

let keywords = [
    'mexico pray',
    'mexico thoughts prayers'
]

var stream = t.stream('statuses/filter', { track: keywords })
    
    stream.on('tweet', function (tweet) {
        const db = require('monk')(process.env.MONGO_URI)
    
        const tweets = db.get('tweets')

        if(!isThisRT(tweet.text)){

            console.log('legit')
            tweets.insert(tweet).then((collection) => {db.close()}).catch((collection) => {console.log(collection)})
        }

        else
            db.close()

    })

