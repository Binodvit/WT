const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // XAMPP default user
    password: '',      // XAMPP default no password
    database: 'electricityDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Calculate bill function
function calculateBill(units) {
    let amount = 0;
    if (units <= 50) {
        amount = units * 3.5;
    } else if (units <= 150) {
        amount = 50 * 3.5 + (units - 50) * 4;
    } else if (units <= 250) {
        amount = 50 * 3.5 + 100 * 4 + (units - 150) * 5.2;
    } else {
        amount = 50 * 3.5 + 100 * 4 + 100 * 5.2 + (units - 250) * 6.5;
    }
    return amount;
}

// API to add consumer
app.post('/api/consumer', (req, res) => {
    const { name, address, phone } = req.body;
    const sql = 'INSERT INTO Consumer (name, address, phone) VALUES (?, ?, ?)';
    db.query(sql, [name, address, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ consumer_id: result.insertId });
    });
});

// API to calculate bill and save billing info
app.post('/api/billing', (req, res) => {
    const { consumer_id, units_consumed } = req.body;
    const bill_amount = calculateBill(units_consumed);
    const billing_date = new Date().toISOString().slice(0, 10);

    const sql = 'INSERT INTO Billing (consumer_id, units_consumed, bill_amount, billing_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [consumer_id, units_consumed, bill_amount, billing_date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ bill_id: result.insertId, bill_amount });
    });
});

// Serve frontend files (optional)
app.use(express.static('public'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
