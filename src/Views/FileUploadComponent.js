import React, { useState } from 'react';
import axios from 'axios';
import axiosClient from '../axios-client';

function FileUploadComponent() {
    const [formData, setFormData] = useState(new FormData());

    const handleFileUpload = (event) => {
        const designDummyFile = event.target.files[0];
        formData.append('designDummy', designDummyFile);

        // Lakukan hal yang sama untuk designCode jika diperlukan
        const designCodeFile = event.target.files[1]; // Ganti dengan indeks yang sesuai jika diperlukan
        formData.append('designCode', designCodeFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axiosClient.post('http://localhost:8000/api/designs', formData)
            .then(response => {
                const data = response.data;
                const designDummyPath = data.designDummyPath;
                const designCodePath = data.designCodePath;

                // Gunakan alamat penyimpanan file untuk mengunduh dan menyimpan file designDummy
                axiosClient.get(`http://localhost:8000/api/download-design/${designDummyPath}`, {
                    responseType: 'blob'
                })
                    .then(response => {
                        const blob = new Blob([response.data]);
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'designDummy.css';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });

                // Gunakan alamat penyimpanan file untuk mengunduh dan menyimpan file designCode
                axiosClient.get(`http://localhost:8000/api/download-design/${designCodePath}`, {
                    responseType: 'blob'
                })
                    .then(response => {
                        const blob = new Blob([response.data]);
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'designCode.js'; // Ganti nama file sesuai kebutuhan
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileUpload} multiple /> {/* Multiple file input */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default FileUploadComponent;
