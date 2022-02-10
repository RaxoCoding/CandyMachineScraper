var file_pattern = /([0-9_.-]+)\.([a-zA-Z0-9_.-]+)\.chunk\.js/i
var wget = require('node-wget');
var cheerio = require('cheerio'),
    request = require('request');
var axios = require('axios');

var possibleFuckers = ['CANDY_MACHINE_ID'];

async function getCandyId(pathToNodeModules, url, _callback) {
    console.log(url);
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
                            dest: pathToNodeModules + '/candymachinescraper/',
                            timeout: 2000 // duration to wait for request fulfillment in milliseconds, default is 2 seconds
                        },
                        async function(error, response, body) {
                            if (error) {
                                _callback({ state: 'error', data: 'Error from Website', error: error });
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
            _callback({ state: 'error', data: 'Error in Url' });
        }
    });
}

async function getMetaData(apiKeyId, apiSecretKey, candyId, _callback) {
    var config = {
        method: 'get',
        url: `https://api.blockchainapi.com/v1/solana/account/mainnet-beta/${candyId}/is_candy_machine`,
        headers: {
            'APISecretKey': apiSecretKey,
            'APIKeyID': apiKeyId,
        }
    };

    await axios(config)
        .then(async function(response) {
            if (response.is_candy_machine) {
                config = {
                    method: 'post',
                    url: `https://api.blockchainapi.com/v1/solana/nft/candy_machine/metadata`,
                    headers: {
                        'APISecretKey': apiSecretKey,
                        'APIKeyID': apiKeyId,
                    },
                    data: {
                        network: 'mainnet-beta',
                        candy_machine_id: candyId,
                        candy_machine_contract_version: response.candy_machine_contract_version
                    }
                };

                await axios(config)
                    .then(function(response) {
                        _callback({ state: 'success', data: response });
                    })
                    .catch(function(error) {
                        _callback({ state: 'error', data: 'ERROR!' });
                        console.log(error.message);
                    });
            } else {
                _callback({ state: 'error', data: 'Not a Candy Machine' });
                console.log(error.message);
            }
        })
        .catch(function(error) {
            _callback({ state: 'error', data: 'ERROR!' });
            console.log(error.message);
        });
}

module.exports.getCandyId = getCandyId;
module.exports.getMetaData = getMetaData;