import './App.css'

import Layout from './Components/CMSLayout.jsx'

function UserProfile({user, onLogout, token}) {
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout onLogout={onLogout} user={user}>
            <div class="text-xl font-extrabold mb-4">Profil</div>
            <div className='UserProfile'>
                <div class="bg-white p-4 mb-4 rounded shadow">
                    <div class="flex items-center mb-2">
                        <div class="w-16 h-16 rounded-full bg-blue-500"></div>
                        <div class="ml-4">
                            <div class="text-xl">User</div>
                            <div class="text-xl text-gray-700 font-bold">{user.username}</div>
                        </div>
                    </div>
                    <div class="text-gray-700"></div>
                </div>

                <div class="bg-white p-4 mb-4 rounded shadow">
                    <div class="mb-4">
                        <div class="border-b mb-2 pb-2">
                            <div class="text-xl font-medium">Informasi Pengguna</div>
                        </div>
                        <form>
                            <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Nama</label>
                                <input type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.name} disabled></input>
                            </div>
                        </form>
                        <div class="border-b mb-2 pb-2">
                            <div class="text-xl font-medium">Informasi Kontak</div>
                        </div>
                        <form>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Email</label>
                                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.email} disabled></input>
                            </div>
                            {/* <div class="mb-6">
                                <label for="password" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Password</label>
                                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.password} disabled></input>
                            </div> */}
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile;