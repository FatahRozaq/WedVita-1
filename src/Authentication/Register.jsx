import { Link } from 'react-router-dom';
import gambar from '../assets/WeddingAuth.png';
import { createRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';


export default function Register() {
  const nameRef = createRef();
  const userNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();
  
  const onSubmit = (ev) => {
    ev.preventDefault()
  
    const payload = {
      name: nameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/register', payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if( response && response.status === 422){
        // response.data.errors
        // console.log(response.data.errors);
        setErrors(response.data.errors)
      }
    })
  }

    return(
      <>
        <div className="bg-gray-100 flex justify-center items-center h-screen">
          <div className="lg:pt-12 lg:pl-20 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 bg-white">
              <h1 className="text-2xl font-semibold mb-4">Registrasi</h1>
              <h3 className="text-base mb-4">Silakan registrasi untuk buat akun baru</h3>

              {errors && 
                <div>
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }

              <form onSubmit={onSubmit}>
              <div className="flex mb-4">
                  <div className="mr-4">
                    <label htmlFor="username" className="block text-gray-600">Nama</label>
                    <input
                      ref={nameRef}
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
                      ref={emailRef}
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
                        ref={userNameRef}
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
                        ref={passwordRef}
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
                        ref={passwordConfirmationRef}
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

    </>
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
