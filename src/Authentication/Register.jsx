import { Link } from 'react-router-dom';
import gambar from '../assets/WeddingAuth.png';

// get : http://127.0.0.1:8000

const onSubmit = (ev) => {
  ev.preventDefault(ev)
}

export default function Register() {
    return(
        <div className="bg-gray-100 flex justify-center items-center h-screen">
          <div className="lg:pt-12 lg:pl-20 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 bg-white">
              <h1 className="text-2xl font-semibold mb-4">Registrasi</h1>
              <h3 className="text-base mb-4">Silakan registrasi untuk buat akun baru</h3>

              <form onSubmit={onSubmit} action="#" method="POST">
              <div className="flex mb-4">
                  <div className="mr-4">
                    <label htmlFor="username" className="block text-gray-600">Nama</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                      autoComplete="off"
                      placeholder="Nama Anda"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-600">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                      autoComplete="off"
                      placeholder="E-mail Anda"
                    />
                  </div>
                </div>

                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-600">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                        autoComplete="off"
                        placeholder="Masukan Username Anda"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-600">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                        autoComplete="off"
                        placeholder="Masukan Password Anda"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-600">Konfirmasi Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                        autoComplete="off"
                        placeholder="Isi Kembali Password Anda"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-buttonPurple hover:bg-indigo-950 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                      Buat Akun
                    </button>
              </form>

              <div className="mt-6 text-center">
                <span href="#" className="text-black">
                  Sudah memiliki akun? <Link to="/login" className="text-textPurple hover:underline">Login Sekarang</Link >
                </span>
              </div>
          </div>

          <div className="w-1/2 h-screen hidden lg:block bg-authBG">
            <img
              src={gambar}
              alt="Placeholder Image"
              className="object-cover w-full h-full"
            />
          </div>
    </div>
    )
}


// import './App.css'
// import gambar from './assets/WeddingAuth.png'

// function App() {

//   return (
//     <>

//     <div className="bg-gray-100 flex justify-center items-center h-screen">
//           <div className="lg:pt-12 lg:pl-20 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 bg-white">
//               <h1 className="text-2xl font-semibold mb-4">Registrasi</h1>
//               <h3 className="text-base mb-4">Silakan registrasi untuk buat akun baru</h3>

//               <form action="#" method="POST">
//               <div className="flex mb-4">
//                   <div className="mr-4">
//                     <label htmlFor="username" className="block text-gray-600">Nama</label>
//                     <input
//                       type="text"
//                       id="username"
//                       name="username"
//                       className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
//                       autoComplete="off"
//                       placeholder="Nama Anda"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-gray-600">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
//                       autoComplete="off"
//                       placeholder="E-mail Anda"
//                     />
//                   </div>
//                 </div>

//                     <div className="mb-4">
//                       <label htmlFor="username" className="block text-gray-600">Username</label>
//                       <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
//                         autoComplete="off"
//                         placeholder="Masukan Username Anda"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label htmlFor="password" className="block text-gray-600">Password</label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
//                         autoComplete="off"
//                         placeholder="Masukan Password Anda"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label htmlFor="password" className="block text-gray-600">Konfirmasi Password</label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
//                         autoComplete="off"
//                         placeholder="Isi Kembali Password Anda"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="bg-buttonPurple hover:bg-indigo-950 text-white font-semibold rounded-md py-2 px-4 w-full"
//                     >
//                       Buat Akun
//                     </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <span href="#" className="text-black">
//                   Sudah memiliki akun? <a className="text-textPurple hover:underline">Login Sekarang</a >
//                 </span>
//               </div>
//           </div>

//           <div className="w-1/2 h-screen hidden lg:block bg-authBG">
//             <img
//               src={gambar}
//               alt="Placeholder Image"
//               className="object-cover w-full h-full"
//             />
//           </div>
//     </div>

//     </>
//   )
// }

// export default App
