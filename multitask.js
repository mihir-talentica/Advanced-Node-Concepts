
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log('Request: ', Date.now() - start, 'ms');
    });
  }).end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash: ', Date.now() - start, 'ms');
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS: ', Date.now() - start, 'ms');
});

doHash();
doHash();
doHash();
doHash();

// If commment out doHash(), FS will be completed in 25 ms
// If doHash() is not commented out, FS will be completed in 330ms


//Hash and FS both make use of threadpool. Since threadpool has 4 threads (by default),
// 1 FS + 3 Hashes will be proccesed in threadpool, But FS needs two round trip becuase in the 1st time it will get the stats of the file and in the 2nd time it will read the file.
// So there are two 2 pauses in FS where threadpool can pick up other hashing (4th one). So hashing got completed first and that thread took the pending fs task.