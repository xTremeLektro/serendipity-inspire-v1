const fs = require('fs');
const path = require('path');

let jsonDataGlobal; // Declare jsonDataGlobal in the global scope

function readJSON(JSONPATH) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, JSONPATH);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                reject(err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                jsonDataGlobal = jsonData; // Assign to the global variable
                resolve(jsonData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                reject(parseError);
            }
        });
    });
}

readJSON('../Data/Photos.json')
    .then(data => {
        console.log("Data from readJSON:", data);
        console.log("Global jsonDataGlobal inside .then():", jsonDataGlobal); //check the value
        // Use the data here
    })
    .catch(err => {
        console.error("Error:", err);
    });

// You can access jsonDataGlobal here, but be aware that it might be undefined
// if readJSON's Promise hasn't resolved yet.
// console.log("Global jsonDataGlobal after readJSON call:", jsonDataGlobal);

// Function to use jsonDataGlobal safely
function useJSONData() {
    if (jsonDataGlobal) {
        console.log("Using jsonDataGlobal:", jsonDataGlobal);
        if (jsonDataGlobal.length > 0) {
            console.log("Photo ID:", jsonDataGlobal[0].id);
            console.log("Project ID:", jsonDataGlobal[0].projectID)
            console.log("Thumbnail:", jsonDataGlobal[0].urlThumb)
            console.log("Photo:", jsonDataGlobal[0].urlFull);
            ;
        }        //  use jsonDataGlobal here
    } else {
        console.warn("jsonDataGlobal is not yet available.");
    }
}

//call the function
setTimeout(useJSONData, 500); // 1000ms is arbitrary,  ensure  readJSON completes.

