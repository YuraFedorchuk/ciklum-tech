'use strict';

const moment    = require('moment');
const schedule  = require('node-schedule');
const client    = require('./../core/redisClient');
const helper    = require('./../core/helper');
const KEY       = 'echo:messages';

const api = {
    processExpired: () => {
        return new Promise((resolve, reject) => {
            var currentDate = +new Date();
            
            client.zrangebyscore(KEY, '-inf', currentDate, (err, msgs) => {
                if (err) {
                    return reject(err);
                }

                const length = msgs.length;
                if (length === 0) {
                    return api.schedule()
                            .then(resolve)
                            .catch(err);;
                }

                for (let i = 0; i < length; i++) {
                    const {message, date} = helper.parseRedisResponse(msgs[i]);
                    api.handleMessage(message);
                }

                client.zremrangebyscore(KEY, '-inf', currentDate, 
                    (err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        api.schedule()
                            .then(resolve)
                            .catch(err);
                });
            });
        });
    },
    echoAtTime: (message, date) => {
        return new Promise((resolve, reject) => {
             if (!message || !date) {
                return reject('Bad params');
            }
    
            if (!moment(date).isValid()) {
                return reject('Invalid date');
            }

            if (moment(date) < moment()) {
                api.handleMessage(message);
                return resolve('ok');
            }

            const score = +new Date(date);
            const value = `${message}:${score}`;

            client.zadd(KEY, score, value, (err, res) => {
                if (err) {
                    return reject(err);
                }

                api.schedule()
                    .then(resolve)
                    .catch(reject)

            });
        }); 
    },
    schedule: () => {
        return new Promise((resolve, reject) => {
            const args = [KEY, '-inf', '+inf', 'LIMIT', 0, 1];

            const jobs = Object.values(schedule.scheduledJobs);
            if (jobs.length) {
                jobs.forEach(j => {
                    j.cancel();
                });
            }

            client.zrangebyscore(args, (err, res) => {
                if (err) {
                    return reject(err);
                }

                if (res.length === 0) {
                    return resolve('ok');
                }

                const { message, date } = helper.parseRedisResponse(res[0]);

                schedule.scheduleJob(new Date(date), function () {
                    api.handleMessage(message);
                    
                    client.zrem(KEY, res, (err) => {
                        if (err) {
                            return reject(err);
                        }
    
                        api.schedule()
                            .then(resolve)
                            .catch(reject);
                    });
                });
    
                resolve('ok');
            });
        });
    },
    handleMessage: (message) => {
        console.log(message);
    }
};

module.exports = api;