# What Does it do?

Grabs Candy Machine ID of any v1 or v2 candy machine websites.

# Installation 

`npm i candymachinescraper --save`

# Example Usage

```
const candyMachineScraper = require('candymachinescraper');

async function test() {
    var url = 'https://mintsite.com';
    await candyMachineScraper.getScript(url, function(data) {
        console.log(data);
        // {
        //   state: 'success',
        //   data: '2QcWbuQTyfEDdHHhpgfoXfptkFipE5J1SqQiZxvZERuR'
        // }
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