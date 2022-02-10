[![npm version](https://img.shields.io/npm/v/candymachinescraper.svg?style=flat-square)](https://www.npmjs.org/package/candymachinescraper)
[![npm downloads](https://img.shields.io/npm/dt/candymachinescraper.svg?style=flat-square)](http://npm-stat.com/charts.html?package=candymachinescraper)

# What Does it do?

Grabs Candy Machine ID of any v1 or v2 candy machine websites.

# Installation 

`npm i candymachinescraper --save`

# Example Usage

```
// Get Candy Id
const candyMachineScraper = require('candymachinescraper');

async function test() {
    var url = 'https://mintsite.com';
    await candyMachineScraper.getCandyId(pathToNodeModules, url, function(data) {
        console.log(data);
        // {
        //   state: 'success',
        //   data: '2QcWbuQTyfEDdHHhpgfoXfptkFipE5J1SqQiZxvZERuR'
        // }
    });
}

test();
```

For getting Metadata it uses the [Blockchain API](https://theblockchainapi.com/)

```
// Get Candy Id & MetaData
const candyMachineScraper = require('candymachinescraper');

async function test() {
    var url = 'https://mintsite.com';
    await candyMachineScraper.getCandyId(pathToNodeModules, url, async function(data) {
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
```

# Sample Response:
```
// Success
{
    state: 'success',
    data: '2QcWbuQTyfEDdHHhpgfoXfptkFipE5J1SqQiZxvZERuR'
}

// Error
{ 
    state: 'error', 
    data: "Didnt't find the ID :(" 
}

```

# Creator

@RaxoCoding
[Twitter](https://twitter.com/RaxoCoding)
[Youtube](https://www.youtube.com/channel/UCGxmNncs5ihjB-xk_9UUHyw)