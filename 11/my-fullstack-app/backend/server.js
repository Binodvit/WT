const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Update with your MySQL password
    database: 'vit_results'
});

// Connect to database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
    console.log('Connected to MySQL database');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('Server started');
});

// GET all students
app.get('/api/students', (req, res) => {
    console.log('API endpoint /api/students accessed');
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET marks by PRN
app.get('/api/marks/:prn', (req, res) => {
    console.log(`API endpoint /api/marks/${req.params.prn} accessed`);
    const prn = req.params.prn;

    db.query('SELECT * FROM MSE WHERE prn = ?', [prn], (err, mse) => {
        if (err) throw err;

        db.query('SELECT * FROM ESE WHERE prn = ?', [prn], (err, ese) => {
            if (err) throw err;

            res.json({ mse: mse[0], ese: ese[0] });
        });
    });
});

// POST new student with MSE and ESE marks
app.post('/api/students', (req, res) => {
    const { prn, name, branch, mse, ese } = req.body;

    db.query('INSERT INTO Students (prn, name, branch) VALUES (?, ?, ?)',
        [prn, name, branch],
        (err) => {
            if (err) throw err;

            db.query('INSERT INTO MSE (prn, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)',
                [prn, mse.subject1, mse.subject2, mse.subject3, mse.subject4],
                (err) => {
                    if (err) throw err;

                    db.query('INSERT INTO ESE (prn, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)',
                        [prn, ese.subject1, ese.subject2, ese.subject3, ese.subject4],
                        (err) => {
                            if (err) throw err;
                            console.log('New student added to database');
                            res.json({ success: true });
                        }
                    );
                }
            );
        }
    );
});
