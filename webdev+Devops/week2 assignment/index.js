const axios = require("axios");
const fs = require('fs');
/**
 * Problem  Statement : to create a "promisified" version of setTimeout, fetch, and fs.readFile
 * But what does it help with 
 * **/

//Understanding Promises

const userLeft = false;
const userWatchingMemes = false;

const watchTutorial = () => {
    return new Promise((resolve, reject) => {
        if (userLeft) {
            reject({
                name: "User Left",
                message: ":("

            });
        }
        else if (userWatchingMemes) {
            reject({
                name: "User Watching Memes",
                message: "Study>memes"
            });

        }
        else {
            resolve("Thank You for Watching. Like and Subscribe");
        }

    });

};
// watchTutorial().then((message) => { console.log(`Success ${message}`); }).catch((err) => { console.log(`${err.name} ${err.message}`); });

// Understanding promises using live data
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Promisifying set setTimeout
// We do need to define reject function we know that setTimeout will not give an error
const delay = (delayTimer) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delayTimer);
    });
};

setTimeout(() => { console.log('Inside Normal Timeout for 5 secs'); }, 5000);
const delayTimer = 3000;
delay(delayTimer).then(() => { console.log(`Inside Timeout Delay for  ${delayTimer} secs`); });


fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => {
        console.log('Data fetched:💥💥💥💥💥', data); // Handle the fetched data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error); // Handle errors
    });



// Promisifying fetch call

const fetchData = (url) => new Promise((res, rej) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched:💥💥💥💥💥🫡🫡🫡', data);
            res(data);// Handle the fetched data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:🤬🤬🤬🤬🤬🤬🤬', error);
            rej(error);// Handle errors
        });

});

fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then((data) => console.log("😂😂😂😂😂😂😂", data))
    .catch((error) => console.error('Error:,😡😡😡😡😡😡😡', error));

// Promisified version of fs.readFile
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

readFile('test.txt')
    .then(data => console.log('File content:', data))
    .catch(error => console.error('Read error:', error));