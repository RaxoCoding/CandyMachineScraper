var file_pattern = /([0-9_.-]+)\.([a-zA-Z0-9_.-]+)\.chunk\.js/i
var wget = require('node-wget');
var cheerio = require('cheerio'),
    request = require('request');

var possibleFuckers = ['CANDY_MACHINE_ID'];

async function getScript(url, _callback) {
    await request(url, async function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);

            var scriptSrcs = $('script').map(function(i) {
                return $(this).attr('src');
            }).get();

            for (var i = 0; i < scriptSrcs.length; i++) {
                if (scriptSrcs[i].match(file_pattern)) {
                    wget({
                            url: url + scriptSrcs[i],
                            dry: true,
                            timeout: 2000 // duration to wait for request fulfillment in milliseconds, default is 2 seconds
                        },
                        async function(error, response, body) {
                            if (error) {
                                _callback({ state: 'error', message: 'Error from Website', error: error });
                            } else {
                                for (let i = 0; i < possibleFuckers.length; i++) {
                                    try {
                                        const candyConfig = body.split(possibleFuckers[i])[1].substring(0, 47).replace(':"', '').replace('"', '');
                                        i = possibleFuckers.length;
                                        _callback({ state: 'success', data: candyConfig });
                                    } catch (e) {
                                        if (i === possibleFuckers.length - 1) {
                                            _callback({ state: 'error', data: "Didnt't find the ID :(" });
                                        }
                                    }
                                }
                            }
                        }
                    );
                }
            }
        } else {
            _callback({ state: 'error', message: 'Error in Url' });
        }
    });
}

module.exports.getScript = getScript;