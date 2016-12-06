var http = require('http');
var _ = require('underscore');

module.exports = function (context, req) {
    http.get('http://wsdot.wa.gov/traffic/api/api/tolling?AccessCode=' + process.env['wsdot_key'], (answer) => {
        let json = '';

        answer.on('data', chunk => {
            json += chunk;
            context.log('Chunk received');
        });
        answer.on('end', () => {
            context.log('Retrieved JSON Data');

            let obj = JSON.parse(json);

            obj = _.filter(obj, function(item) {
                return item.TripName === '405tp01586'
                    || item.TripName === '405tp02614'
                    || item.TripName === '405tp02252';
            });// [{ 'TripName': '405tp01586' }, { 'TripName': '405tp02251' }]);

            let friendlyText = '<html>';
            _.each(obj, (toll) => {
                friendlyText += toll.StartLocationName + ' to '
                    + toll.EndLocationName + ': '
                    + toll.CurrentToll + '<br />';
            });      
            
            res = {
                status: 200,
                body: friendlyText,
                headers: {
                    'Content-Type': 'text/html'
                }
            };

            context.res = {
                status: 200,
                body: friendlyText,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
            context.done(null, res); 
                                 
        });
    });    
};