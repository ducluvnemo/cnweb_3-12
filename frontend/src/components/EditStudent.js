import React, { useState } from 'react';
import axios from 'axios';

export default function EditStudent({ apiUrl, student, onUpdated, onCancel }) {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [stuClass, setStuClass] = useState(student.class);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(apiUrl + '/api/students/' + student._id, { name, age: Number(age), class: stuClass })
      .then(res => onUpdated(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
      <h3>Chỉnh sửa học sinh</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input required value={name} onChange={e => setName(e.target.value)} />
        <input required type="number" value={age} onChange={e => setAge(e.target.value)} />
        <input required value={stuClass} onChange={e => setStuClass(e.target.value)} />
        <button type="submit">Lưu</button>
        <button type="button" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
}
