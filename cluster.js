process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const crypto = require('crypto');

// Is file being executed in master mode?
if(cluster.isPrimary) { // isMaster is deprecated in favor of isPrimary.
    //Cause index.js to be executed again but in child mode
    cluster.fork();
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    //Im a child, I will do the work of the app
    const express = require('express');

    const app = express();

    // function doWork(duration) {
    //     const start = Date.now();
    //     while (Date.now() - start < duration) {
    //         // Block the event loop for the specified duration
    //     }
    // }

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hello There!');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    });

    app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    })
}