const fs = require('fs');

const filePath = '/model/data.json';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        
        const jsonData = JSON.parse(data);
        
        console.log(jsonData);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
});