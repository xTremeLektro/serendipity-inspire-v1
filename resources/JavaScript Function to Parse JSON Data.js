/*
 * Function: parseDatabaseTextFile
 * -----------------------------
 * Parses a text file where each line represents a record from a database table.
 *
 * Parameters:
 * - fileContent (string): A string containing the entire content of the text file.
 * - delimiter (string, optional): The character(s) separating fields in each record.
 * Defaults to tab ("\t").  You can change this to ",", "|", etc., as needed.
 *
 * Returns:
 * - array of objects: An array where each element is an object representing a record.
 * The object's keys are the field names (from the first line), and the values
 * are the corresponding data from each record.  If the file has no header row,
 * it returns an array of arrays (see the 'noHeader' option below).
 *
 * Options:
 * - hasHeader (boolean, optional):  Indicates whether the first line of the file
 * contains field names (a header row).  Defaults to true. If false, the function
 * returns an array of arrays, where each inner array represents a record, and
 * you'll need to use numeric indices (e.g., record[0], record[1]) to access
 * the fields.
 * - trimValues (boolean, optional): If true, trims leading/trailing whitespace from
 * each field value. Defaults to true.
 * - emptyStringToNull (boolean, optional): If true, converts empty strings "" to null.
 * Defaults to true.
 * - noHeader (boolean, optional):  Shorthand for hasHeader: false.  If this is true,
 * it overrides the hasHeader option.  Defaults to false.
 */
function parseDatabaseTextFile(fileContent, options = {}) {
    const {
        delimiter = "\t",
        hasHeader = true,
        trimValues = true,
        emptyStringToNull = true,
        noHeader = false //Shorthand for hasHeader: false
    } = options;

    const effectiveHasHeader = noHeader ? false : hasHeader; // noHeader overrides hasHeader

    const lines = fileContent.trim().split("\n");
    if (!lines[0]) {
        return []; // Handle empty file
    }

    const headers = effectiveHasHeader
        ? lines[0].split(delimiter).map(h => trimValues ? h.trim() : h)
        : null;

    const data = [];
    const startRow = effectiveHasHeader ? 1 : 0; // Start from 1 if there's a header, 0 if not.

    for (let i = startRow; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(delimiter).map(v => {
            const trimmedValue = trimValues ? v.trim() : v;
            return emptyStringToNull && trimmedValue === "" ? null : trimmedValue;
        });

        if (effectiveHasHeader) {
            if (values.length !== headers.length) {
                console.warn(`Skipping row ${i + 1}: Inconsistent number of values and headers.`);
                continue; // Skip rows with incorrect number of values.  Important for data integrity.
            }
            const record = {};
            for (let j = 0; j < headers.length; j++) {
                record[headers[j]] = values[j];
            }
            data.push(record);
        } else {
            data.push(values); // push the array of values.
        }
    }
    return data;
}

// Example Usage (included in the comment of the function):
// const fileContent = `
// id\tname\temail\tphone\tcity\tstate\tzip\tdate_joined\tstatus\tnotes
// 1\tJohn Doe\tjohn.doe@example.com\t555-123-4567\tAnytown\tCA\t12345\t2023-01-15\tActive\t
// 2\tJane Smith\tjane.smith@example.com\t555-987-6543\tSomeville\tNY\t67890\t2023-02-20\tInactive\tNeeds follow-up
// 3\tBob Johnson\tbob.johnson@example.com\t555-246-8012\tOthercity\tTX\t54321\t2023-03-10\tActive\t
// 4\tAlice Brown\talice.brown@example.com\t555-135-7911\tAnytown\tCA\t12345\t2023-04-05\tPending\t
// 5\tMike Davis\tmike.davis@example.com\t555-864-2010\tSomeville\tNY\t67890\t2023-05-12\tActive\t
// 6\tSarah Wilson\tsarah.wilson@example.com\t555-753-1909\tOthercity\tTX\t54321\t2023-06-01\tInactive\t
// 7\tDavid Garcia\tdavid.garcia@example.com\t555-642-1808\tAnytown\tCA\t12345\t2023-07-22\tActive\t
// 8\tLinda Rodriguez\tlinda.rodriguez@example.com\t555-531-1707\tSomeville\tNY\t67890\t2023-08-18\tPending\t
// 9\tChristopher Williams\tchris.williams@example.com\t555-420-1606\tOthercity\tTX\t54321\t2023-09-08\tActive\t
// 10\tAngela Garcia\tangela.garcia@example.com\t555-319-1505\tAnytown\tCA\t12345\t2023-10-29\tInactive\t
// `;

const fileContent = `
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "555-123-4567",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345",
        "date_joined": "2023-01-15",
        "status": "Active",
        "notes": null
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "555-987-6543",
        "city": "Someville",
        "state": "NY",
        "zip": "67890",
        "date_joined": "2023-02-20",
        "status": "Inactive",
        "notes": "Needs follow-up"
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "email": "bob.johnson@example.com",
        "phone": "555-246-8012",
        "city": "Othercity",
        "state": "TX",
        "zip": "54321",
        "date_joined": "2023-03-10",
        "status": "Active",
        "notes": null
    },
    {
        "id": 4,
        "name": "Alice Brown",
        "email": "alice.brown@example.com",
        "phone": "555-135-7911",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345",
        "date_joined": "2023-04-05",
        "status": "Pending",
        "notes": null
    },
    {
        "id": 5,
        "name": "Mike Davis",
        "email": "mike.davis@example.com",
        "phone": "555-864-2010",
        "city": "Someville",
        "state": "NY",
        "zip": "67890",
        "date_joined": "2023-05-12",
        "status": "Active",
        "notes": null
    },
    {
        "id": 6,
        "name": "Sarah Wilson",
        "email": "sarah.wilson@example.com",
        "phone": "555-753-1909",
        "city": "Othercity",
        "state": "TX",
        "zip": "54321",
        "date_joined": "2023-06-01",
        "status": "Inactive",
        "notes": null
    },
    {
        "id": 7,
        "name": "David Garcia",
        "email": "david.garcia@example.com",
        "phone": "555-642-1808",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345",
        "date_joined": "2023-07-22",
        "status": "Active",
        "notes": null
    },
    {
        "id": 8,
        "name": "Linda Rodriguez",
        "email": "linda.rodriguez@example.com",
        "phone": "555-531-1707",
        "city": "Someville",
        "state": "NY",
        "zip": "67890",
        "date_joined": "2023-08-18",
        "status": "Pending",
        "notes": null
    },
    {
        "id": 9,
        "name": "Christopher Williams",
        "email": "chris.williams@example.com",
        "phone": "555-420-1606",
        "city": "Othercity",
        "state": "TX",
        "zip": "54321",
        "date_joined": "2023-09-08",
        "status": "Active",
        "notes": null
    },
    {
        "id": 10,
        "name": "Angela Garcia",
        "email": "angela.garcia@example.com",
        "phone": "555-319-1505",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345",
        "date_joined": "2023-10-29",
        "status": "Inactive",
        "notes": null
    }
]
`;

try {
    const data = JSON.parse(fileContent);
    console.log(data);

    // Example of accessing data:
    if (data.length > 0) {
        console.log("First record's name:", data[0].name);
        console.log("Third record's email:", data[2].email);
    }
} catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error appropriately (e.g., show a message to the user)
}

/* Okay, here's an example of how to parse your data if it's already in JSON format, along with a modified version of the usage example.

Explanation:

    - JSON Data: The fileContent is now a JSON string. This is the most common format for data exchange on the web, and it directly represents an array 
    of objects.
    - JSON.parse(): The key change is the use of the built-in JavaScript function JSON.parse(fileContent). This function takes a JSON string and converts 
    it into a JavaScript object (in this case, an array of objects).
    - Error Handling: It's crucial to use a try...catch block when parsing JSON. If the fileContent is not valid JSON, JSON.parse() will throw an error, 
    and this will prevent your program from crashing. The catch block allows you to handle the error gracefully (e.g., log an error message, display a 
    user-friendly message, or attempt to use an alternative data source).
    - Direct Access: After successful parsing, you can access the data directly as a JavaScript array of objects. The structure is exactly as in the original 
    example, so the way you access the data (e.g., data[0].name, data[2].email) remains the same.

Key Advantages of JSON:

    - Simplicity: JSON is very easy for both humans and machines to read and write.
    - Standard Format: It's the standard data format for web applications, supported by all modern browsers and server-side languages.
    - Direct Mapping to Objects: JSON's structure maps directly to JavaScript objects, making it very natural to work with in JavaScript code.

If you can get your data in JSON format, it's generally the best way to handle it in JavaScript.  It eliminates the need for custom parsing logic and is 
more efficient and less error-prone.

*/