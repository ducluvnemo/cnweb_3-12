import React, { useState } from 'react';
import axios from 'axios';

export default function AddStudentForm({ apiUrl, onAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, age: Number(age), stuClass };

    axios.post(apiUrl + '/api/students', payload)
      .then(res => {
        onAdded(res.data);
        setName('');
        setAge('');
        setStuClass('');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <input required value={name} placeholder="Họ tên" onChange={e => setName(e.target.value)} />
      <input required type="number" value={age} placeholder="Tuổi" onChange={e => setAge(e.target.value)} />
      <input required value={stuClass} placeholder="Lớp" onChange={e => setStuClass(e.target.value)} />
      <button type="submit">Thêm học sinh</button>
    </form>
  );
}
