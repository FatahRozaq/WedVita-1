import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Layout from '../../Components/CMSLayout.jsx';

function EditDataUndangan() {
  const { id } = useParams();
  const [existingData, setExistingData] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    // Fetch the existing data for editing
    axiosClient.get(`/getInvitation/${id}`)
      .then(({ data }) => {
        setExistingData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleEdit = () => {
    // Handle the edit action here
    if (existingData) {
      const formData = new FormData();
      formData.append('groomName', existingData.groomName);
      formData.append('brideName', existingData.brideName);
      formData.append('groomPhoto', existingData.groomPhoto);
      formData.append('bridePhoto', existingData.bridePhoto);
      formData.append('coverPhoto', existingData.coverPhoto);
      formData.append('weddingDate', existingData.weddingDate);
      formData.append('weddingTime', existingData.weddingTime);
      formData.append('weddingMap', existingData.weddingMap);
      formData.append('weddingLocation', existingData.weddingLocation);
      formData.append('fatherOfGroom', existingData.fatherOfGroom);
      formData.append('motherOfGroom', existingData.motherOfGroom);
      formData.append('fatherOfBride', existingData.fatherOfBride);
      formData.append('motherOfBride', existingData.motherOfBride);
      formData.append('accountNumber', existingData.accountNumber);

      axiosClient.put(`/invitations/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          // Handle success (e.g., show a success message)
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          setErrors(error.response.data.errors);
        });
    }
  };

  if (!existingData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      {/* {errors && (
        <div>
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          )}
        </div>
      } */}

      <div className="text-xl font-extrabold mb-4">Edit Data Kartu Undangan</div>
      <div className='DataKartuUndangan'>
        <form onSubmit={handleEdit}>
          <div className="bg-white p-4 mb-4 rounded shadow">
            <div className="mb-4">
              <label htmlFor="groomName" className="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Pria</label>
              <input
                type="text"
                name="groomName"
                value={existingData.groomName}
                onChange={(e) => setExistingData({ ...existingData, groomName: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Pengantin Pria"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="brideName" className="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Wanita</label>
              <input
                type="text"
                name="brideName"
                value={existingData.brideName}
                onChange={(e) => setExistingData({ ...existingData, brideName: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Pengantin Wanita"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fatherOfGroom" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Pria</label>
              <input
                type="text"
                name="fatherOfGroom"
                value={existingData.fatherOfGroom}
                onChange={(e) => setExistingData({ ...existingData, fatherOfGroom: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ayah Pengantin Pria"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fatherOfBride" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Wanita</label>
              <input
                type="text"
                name="fatherOfBride"
                value={existingData.fatherOfBride}
                onChange={(e) => setExistingData({ ...existingData, fatherOfBride: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ayah Pengantin Wanita"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="motherOfGroom" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Pria</label>
              <input
                type="text"
                name="motherOfGroom"
                value={existingData.motherOfGroom}
                onChange={(e) => setExistingData({ ...existingData, motherOfGroom: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ibu Pengantin Pria"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="motherOfBride" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Wanita</label>
              <input
                type="text"
                name="motherOfBride"
                value={existingData.motherOfBride}
                onChange={(e) => setExistingData({ ...existingData, motherOfBride: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ibu Pengantin Wanita"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="groomPhoto" className="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Pria</label>
              <input
                type="file"
                name="groomPhoto"
                accept="image/*"
                onChange={(e) => setExistingData({ ...existingData, groomPhoto: e.target.files[0] })}
                className="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bridePhoto" className="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Wanita</label>
              <input
                type="file"
                name="bridePhoto"
                accept="image/*"
                onChange={(e) => setExistingData({ ...existingData, bridePhoto: e.target.files[0] })}
                className="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fatherOfGroom" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Pria</label>
              <input
                type="text"
                name="fatherOfGroom"
                value={existingData.fatherOfGroom}
                onChange={(e) => setExistingData({ ...existingData, fatherOfGroom: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ayah Pengantin Pria"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fatherOfBride" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Wanita</label>
              <input
                type="text"
                name="fatherOfBride"
                value={existingData.fatherOfBride}
                onChange={(e) => setExistingData({ ...existingData, fatherOfBride: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ayah Pengantin Wanita"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="motherOfGroom" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Pria</label>
              <input
                type="text"
                name="motherOfGroom"
                value={existingData.motherOfGroom}
                onChange={(e) => setExistingData({ ...existingData, motherOfGroom: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ibu Pengantin Pria"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="motherOfBride" className="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Wanita</label>
              <input
                type="text"
                name="motherOfBride"
                value={existingData.motherOfBride}
                onChange={(e) => setExistingData({ ...existingData, motherOfBride: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nama Ibu Pengantin Wanita"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weddingDate" className="block mb-2 text-sm font-semibold text-gray-900">Tanggal Pernikahan</label>
              <input
                type="date"
                name="weddingDate"
                value={existingData.weddingDate}
                onChange={(e) => setExistingData({ ...existingData, weddingDate: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weddingTime" className="block mb-2 text-sm font-semibold text-gray-900">Waktu Pernikahan</label>
              <input
                type="time"
                name="weddingTime"
                value={existingData.weddingTime}
                onChange={(e) => setExistingData({ ...existingData, weddingTime: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weddingLocation" className="block mb-2 text-sm font-semibold text-gray-900">Lokasi Pernikahan</label>
              <input
                type="text"
                name="weddingLocation"
                value={existingData.weddingLocation}
                onChange={(e) => setExistingData({ ...existingData, weddingLocation: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Lokasi Pernikahan"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coverPhoto" className="block mb-2 text-sm font-semibold text-gray-900">Cover Undangan Pernikahan</label>
              <input
                type="file"
                name="coverPhoto"
                accept="image/*"
                onChange={(e) => setExistingData({ ...existingData, coverPhoto: e.target.files[0] })}
                className="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weddingMap" className="block mb-2 text-sm font-semibold text-gray-900">Peta Lokasi Pernikahan</label>
              <input
                type="text"
                name="weddingMap"
                value={existingData.weddingMap}
                onChange={(e) => setExistingData({ ...existingData, weddingMap: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Peta Lokasi Pernikahan"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block mb-2 text-sm font-semibold text-gray-900">Nomor Rekening Pengantin</label>
              <input
                type="text"
                name="accountNumber"
                value={existingData.accountNumber}
                onChange={(e) => setExistingData({ ...existingData, accountNumber: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Masukan Nomor Rekening Pengantin"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-700"
          >
            Edit Data Undangan
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditDataUndangan;
