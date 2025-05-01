function readJSON(JSONPATH) {
    const fs = require('fs');
    const path = require('path');

    const loadJSON = async () => {
        try {
            // Construct the file path using the 'path' module:
            const filePath = path.join(__dirname, JSONPATH); // __dirname is the directory name of the current module

            // Read the file using 'fs.readFile':
            fs.readFile(filePath, 'utf8', (err, data) => { // Specify 'utf8' encoding
                if (err) {
                    console.error('Error reading file:', err);
                    return; // IMPORTANT: Exit the callback on error
                }

                // Parse the JSON data:
                try {
                    const jsonData = JSON.parse(data);
                    console.log(jsonData);
                    // You can now use jsonData
                    // Example: console.log(jsonData[0].name);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            });


        } catch (error) {
            console.error('Error loading JSON:', error);
        }
    };
    loadJSON();
};

readJSON('../Data/Photos.json');
