import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudentForm from './components/AddStudentForm';
import EditStudent from './components/EditStudent';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const API = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  const fetchStudents = () => {
    axios.get(API + '/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = (student) => {
    setStudents(prev => [...prev, student]);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    axios.delete(API + '/api/students/' + id)
      .then(() => setStudents(prev => prev.filter(s => s._id !== id)));
  };

  const handleUpdateLocal = (updated) => {
    setStudents(prev => prev.map(s => s._id === updated._id ? updated : s));
    setEditing(null);
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const an = a.name.toLowerCase();
    const bn = b.name.toLowerCase();
    return sortAsc ? an.localeCompare(bn) : bn.localeCompare(an);
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Quản lý học sinh</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <input placeholder="Tìm kiếm theo tên..."
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={() => setSortAsc(prev => !prev)}>
          Sắp xếp: {sortAsc ? "A→Z" : "Z→A"}
        </button>
        <button onClick={fetchStudents}>Làm mới</button>
      </div>

      <AddStudentForm apiUrl={API} onAdded={handleAdd} />

      {editing && (
        <EditStudent
          apiUrl={API}
          student={editing}
          onUpdated={handleUpdateLocal}
          onCancel={() => setEditing(null)}
        />
      )}

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.stuClass}</td>
              <td>
                <button onClick={() => setEditing(s)}>Sửa</button>
                <button onClick={() => handleDelete(s._id)}>Xóa</button>
              </td>
            </tr>
          ))}

          {sorted.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Không có học sinh
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
