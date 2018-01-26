// var schedule = require('node-schedule');
// var date = new Date('2018-26-01 06:38:40');

// var j = schedule.scheduleJob(date, function () {
//     console.log('The world is going to end today.');
// });

// const redis = require('./core/redis');

// redis.zadd('messages', +new Date(), 'message2');
// redis.zadd('messages', +new Date('2018-01-26 07:00:00'), 'message1');
// redis.zadd('messages', +new Date(), 'message3');


// redis.zrangebyscore('messages', '-inf', +new Date('2018-01-26 07:30:00'), (err, res) => {
//     console.log(err, res);
    
//     redis.zremrangebyscore('messages', '-inf', +new Date('2018-01-26 07:30:00'), (err, res) => {
//         console.log(err, res);

//         // redis.zrangebyscore('messages', '-inf', +new Date('2018-01-26 07:30:00'), (err, res) => {
//         redis.zrangebyscore('messages', '-inf', '+inf', (err, res) => {
//             console.log(err, res);
//         });
//     });
// });


const api = require('./api');

// api.schedule()
//     .then(console.log)
//     .catch(console.error)