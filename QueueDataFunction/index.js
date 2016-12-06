var http = require('http');
var _ = require('underscore');

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();

        let json = '';

        answer.on('data', chunk => {
            json += chunk;
            context.log('Chunk received');
        });
        answer.on('end', () => {
            context.log('Retrieved JSON Data');

            let obj = JSON.parse(json);
            
            let count = 0;
            _.each(obj, tollItem => {
                tollItem.timestamp = timeStamp;
                count++;
            });

            //An array allows us to send multiples messages
            context.bindings.outputEventHubMessage = obj;

            context.log('Sent ' + count + ' messages');

            context.done();
                                 
        });
    });
};
