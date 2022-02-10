// Get Candy Id & MetaData
const candyMachineScraper = require('candymachinescraper');

async function test() {
    var url = 'https://mintsite.com';
    await candyMachineScraper.getCandyId(pathToNodeModules, url, function(data) {
        console.log(data);
        // {
        //   state: 'success',
        //   data: '2QcWbuQTyfEDdHHhpgfoXfptkFipE5J1SqQiZxvZERuR'
        // }

        var candyId = data.data;

        await candyMachineScraper.getMetaData(apiKeyId, apiSecretKey, candyId, function(data) {
            console.log(data);
            // {
            //   state: 'success',
            //   data: (Candy Machine Metadata)
            // }
        });
    });
}

test();