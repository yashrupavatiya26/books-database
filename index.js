const express = require('express');
const path = require('path');
const dynamoDB = require('./dynamodb'); // Use the new DynamoDB file

const port = 80;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.urlencoded());

// Define the DynamoDB Table
const tableName = 'anything'; // Replace with your DynamoDB table name

// Home route
app.get('/', async (req, res) => {
    try {
        const params = { TableName: tableName };
        const data = await dynamoDB.scan(params).promise();
        res.render('index', { all: data.Items });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data.");
    }
});

// Insert data
app.post('/insertdata', async (req, res) => {
    // Extracting the fields from the request body
    let Bname = req.body.Bname;
    let Bprice = req.body.Bprice;
    let Bauthor = req.body.Bauthor;
    let pages = req.body.pages;

    // Defining the item structure for DynamoDB
    const item = {
        id: Math.floor(Math.random() * 10000), // Unique ID for the record
        Bname: Bname,
        Bprice: Bprice,
        Bauthor: Bauthor,
        pages: parseInt(pages) // Ensure pages is stored as a number
    };

    // Parameters for the put operation
    const params = {
        TableName: 'anything', // Replace with your DynamoDB table name
        Item: item
    };

    try {
        // Insert the item into DynamoDB
        await dynamoDB.put(params).promise();
        console.log("Record successfully inserted");
        return res.redirect('/');
    } catch (err) {
        console.error("Error inserting record into DynamoDB:", err);
        return res.status(500).send("Error inserting data.");
    }
});

app.get('/view', async (req, res) => {
    // Parameters for the scan operation
    const params = {
        TableName: 'anything' // Replace with your DynamoDB table name
    };

    try {
        // Fetch all records from the DynamoDB table
        const data = await dynamoDB.scan(params).promise();
        console.log("Records fetched successfully");

        // Render the view template with the fetched records
        return res.render('view', {
            allrecord: data.Items // Pass the records to the template
        });
    } catch (err) {
        console.error("Error fetching records from DynamoDB:", err);
        return res.status(500).send("Error fetching records.");
    }
});

// Delete data (example route)
app.get('/deletedata/:id', async (req, res) => {
    let deleteid = parseInt(req.params.id); // Assuming `id` is a number

    const params = {
        TableName: 'anything', // Replace with your table name
        Key: { id: deleteid } // Primary key to identify the item
    };

    try {
        await dynamoDB.delete(params).promise();
        console.log("Record successfully deleted");
        return res.redirect('back');
    } catch (err) {
        console.error("Error deleting record from DynamoDB:", err);
        return res.status(500).send("Error deleting record.");
    }
});

app.get('/editdata/:id', async (req, res) => {
    let editid = parseInt(req.params.id); // Assuming `id` is a number

    const params = {
        TableName: 'anything', // Replace with your table name
        Key: { id: editid } // Primary key to identify the item
    };

    try {
        const data = await dynamoDB.get(params).promise();
        if (!data.Item) {
            console.log("Record not found");
            return res.status(404).send("Record not found");
        }

        return res.render('edit', {
            editR: data.Item // Pass the record to the template
        });
    } catch (err) {
        console.error("Error fetching record from DynamoDB:", err);
        return res.status(500).send("Error fetching record.");
    }
});

app.post('/updateData', async (req, res) => {
    let id = parseInt(req.body.id); // Assuming `id` is a number

    const params = {
        TableName: 'anything', // Replace with your table name
        Key: { id: id }, // Primary key to identify the item
        UpdateExpression: "set Bname = :bname, Bprice = :bprice, Bauthor = :bauthor, pages = :pages",
        ExpressionAttributeValues: {
            ":bname": req.body.Bname,
            ":bprice": req.body.Bprice,
            ":bauthor": req.body.Bauthor,
            ":pages": parseInt(req.body.pages) // Ensure pages is a number
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        await dynamoDB.update(params).promise();
        console.log("Record successfully updated");
        return res.redirect('/view');
    } catch (err) {
        console.error("Error updating record in DynamoDB:", err);
        return res.status(500).send("Error updating record.");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error("Server failed to start:", err);
        return;
    }
    console.log(`Server running on port ${port}`);
});
