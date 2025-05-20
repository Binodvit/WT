import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        prn: '', name: '', branch: '',
        mse: { subject1: 0, subject2: 0, subject3: 0, subject4: 0 },
        ese: { subject1: 0, subject2: 0, subject3: 0, subject4: 0 }
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/students')
            .then(res => res.json())
            .then(data => setStudents(data));
    }, []);

    const fetchMarks = (prn) => {
        fetch(`http://localhost:3000/api/marks/${prn}`)
            .then(res => res.json())
            .then(data => setMarks(prev => ({ ...prev, [prn]: data })));
    };

    const handleInputChange = (e, type, subject) => {
        const { name, value } = e.target;
        if (type) {
            setFormData({
                ...formData,
                [type]: { ...formData[type], [subject]: parseFloat(value) || 0 }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStudents([...students, { prn: formData.prn, name: formData.name, branch: formData.branch }]);
                    setShowForm(false);
                    setFormData({
                        prn: '', name: '', branch: '',
                        mse: { subject1: 0, subject2: 0, subject3: 0, subject4: 0 },
                        ese: { subject1: 0, subject2: 0, subject3: 0, subject4: 0 }
                    });
                }
            });
    };

    const calculateTotal = (mse, ese) => {
        if (!mse || !ese) return 0;
        const subjects = ['subject1', 'subject2', 'subject3', 'subject4'];
        return subjects.reduce((total, subj) => 
            total + (mse[subj] * 0.3 + ese[subj] * 0.7), 0).toFixed(2);
    };

    return (
        <div className="container">
            <h1>VIT Semester Results</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Student'}
            </button>

            {showForm && (
                <div className="form">
                    <h3>Add Student</h3>
                    <input
                        type="text"
                        name="prn"
                        placeholder="PRN"
                        value={formData.prn}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                    />
                    <h4>MSE Marks</h4>
                    <input
                        type="number"
                        placeholder="Subject 1"
                        value={formData.mse.subject1}
                        onChange={e => handleInputChange(e, 'mse', 'subject1')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 2"
                        value={formData.mse.subject2}
                        onChange={e => handleInputChange(e, 'mse', 'subject2')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 3"
                        value={formData.mse.subject3}
                        onChange={e => handleInputChange(e, 'mse', 'subject3')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 4"
                        value={formData.mse.subject4}
                        onChange={e => handleInputChange(e, 'mse', 'subject4')}
                    />
                    <h4>ESE Marks</h4>
                    <input
                        type="number"
                        placeholder="Subject 1"
                        value={formData.ese.subject1}
                        onChange={e => handleInputChange(e, 'ese', 'subject1')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 2"
                        value={formData.ese.subject2}
                        onChange={e => handleInputChange(e, 'ese', 'subject2')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 3"
                        value={formData.ese.subject3}
                        onChange={e => handleInputChange(e, 'ese', 'subject3')}
                    />
                    <input
                        type="number"
                        placeholder="Subject 4"
                        value={formData.ese.subject4}
                        onChange={e => handleInputChange(e, 'ese', 'subject4')}
                    />
                    <br />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}

            <div className="results">
                <h3>Student Results</h3>
                <table>
                    <thead>
                        <tr>
                            <th>PRN</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Total Marks</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.prn}>
                                <td>{student.prn}</td>
                                <td>{student.name}</td>
                                <td>{student.branch}</td>
                                <td>
                                    {marks[student.prn] ? 
                                        calculateTotal(marks[student.prn].mse, marks[student.prn].ese) : 
                                        'Loading...'}
                                </td>
                                <td>
                                    <button onClick={() => fetchMarks(student.prn)}>
                                        View Marks
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
