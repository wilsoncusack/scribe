// var OAuth= require('oauth').OAuth;
// var fs = require('fs');
// // var Twitter = require('twit-stream');


// // var options = {
// //   consumer_key: 'PiswRNtEweGugfl8EhEfacV0p',
// //   consumer_secret: 'AbYW2S7MLL38yzUyvRL7ozfqk6Ey5oCmqLz2nFCUEnHcgf8Zlq',
// //   oauth_token: 'LlLOanPCNh6di8uLCwAE0piM6jsVKVsNlzrLwA9N',
// //   oauth_secret: 'saFPUCtJlWao5HW9YubCkLxSNcwv9BsJYFceUmLGZHiaA'
// // };

// // var stream = new Twitter(options).filter({ track: 'Javascript' });
//  // var save = fs.createWriteStream('./sample.dat');
// // stream.pipe(save);

// var save = fs.createWriteStream('./sample.dat');
// oAuth= new OAuth(
//   "https://twitter.com/oauth/request_token",
//   "https://twitter.com/oauth/access_token", 
//   "PiswRNtEweGugfl8EhEfacV0p", "AbYW2S7MLL38yzUyvRL7ozfqk6Ey5oCmqLz2nFCUEnHcgf8Zlq", 
//   "1.0A", null, "HMAC-SHA1"
// );

// oAuth.post(
//   "https://stream.twitter.com/1.1/statuses/filter.json",
//   "248459532-LlLOanPCNh6di8uLCwAE0piM6jsVKVsNlzrLwA9N", "saFPUCtJlWao5HW9YubCkLxSNcwv9BsJYFceUmLGZHiaA",
//   {"track":"#test"},
//   function(error, data) {
//     if(error) console.log(require('sys').inspect(error))
//     else console.log(data);
//   }
// );


var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'PiswRNtEweGugfl8EhEfacV0p',
    consumer_secret: 'AbYW2S7MLL38yzUyvRL7ozfqk6Ey5oCmqLz2nFCUEnHcgf8Zlq',
    token: '248459532-LlLOanPCNh6di8uLCwAE0piM6jsVKVsNlzrLwA9N',
    token_secret: 'saFPUCtJlWao5HW9YubCkLxSNcwv9BsJYFceUmLGZHiaA'
  })

t.on('tweet', function (tweet) {
  console.log(tweet.entities.media)
})

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('#')

// t.track('pizza')

// // 5 minutes later
// t.track('tacos')

// // 10 minutes later
// t.untrack('pizza')
