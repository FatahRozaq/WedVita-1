import './App.css'

import Layout from './Components/CMSLayout.jsx'

function UserProfile({user, onLogout, token}) {
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">Profil</div>
            <div className='UserProfile'>
                <div className="bg-white p-4 mb-4 rounded shadow">
                    <div className="flex items-center mb-2">
                        <div className="w-16 h-16 rounded-full bg-blue-500"></div>
                        <div className="ml-4">
                            <div className="text-xl">User</div>
                            <div className="text-xl text-gray-700 font-bold">{user.username}</div>
                        </div>
                    </div>
                    <div className="text-gray-700"></div>
                </div>

                <div className="bg-white p-4 mb-4 rounded shadow">
                    <div className="mb-4">
                        <div className="border-b mb-2 pb-2">
                            <div className="text-xl font-medium">Informasi Pengguna</div>
                        </div>
                        <form>
                            <div className="mb-6">
                                <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Nama</label>
                                <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.name} disabled></input>
                            </div>
                        </form>
                        <div className="border-b mb-2 pb-2">
                            <div className="text-xl font-medium">Informasi Kontak</div>
                        </div>
                        <form>
                            <div className="mb-6">
                                <label for="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.email} disabled></input>
                            </div>
                            {/* <div className="mb-6">
                                <label for="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Password</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.password} disabled></input>
                            </div> */}
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile;