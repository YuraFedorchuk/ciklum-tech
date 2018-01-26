'use strict';

module.exports = {
    parseRedisResponse: val => {        
        const i = val.lastIndexOf(':'); 

        return { 
            message: val.substr(0, i),
            date: parseInt( val.substr(i+1) )
        };
    }
}