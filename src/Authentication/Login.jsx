import { Link } from 'react-router-dom'
import gambar from '../assets/WeddingAuth.png'

export default function Login() {

  const onSubmit = (ev) => {
    ev.preventDefault()
  }
  return (
    <>

    <div className="bg-gray-100 flex justify-center items-center h-screen">
          <div className="lg:pt-12 lg:pl-20 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 bg-white">
              <h1 className="text-2xl font-semibold mb-4">Login</h1>
              <h3 className="text-base mb-4">Silakan login terlebih dahulu</h3>

              <form onSubmit={onSubmit} action="#" method="POST">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-600">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-white"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="bg-red-950 text-blue-500"
                    />
                    <label htmlFor="remember" className="text-gray-600 ml-2">
                      Ingat Saya
                    </label>
                  </div>
                  <div className="mb-6 text-customPurple">
                    <a href="#" className="hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="bg-buttonPurple hover:bg-indigo-950 text-white font-semibold rounded-md py-2 px-4 w-full"
                  >
                    Login
                  </button>
                </form>

              <div className="mt-6 text-center">
                <span href="#" className="text-black">
                  Belum memiliki akun? <Link to="/register" className="text-textPurple hover:underline">Buat Akun Sekarang</Link >
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

