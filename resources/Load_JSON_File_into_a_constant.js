const loadJSON = async () => {
    try {
        // Construct the file URL:
        const filePath = 'file:///C:/Users/sergi/myVSCodeDev/serendipity-inspire-v1/data/Projects.json';
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // You can now use the 'data' constant.
        // console.log(data.name);
        // console.log(data.items[0]);

    } catch (error) {
        console.error('Error loading JSON:', error);
    }
};

loadJSON();