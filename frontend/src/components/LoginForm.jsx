import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                'http://localhost:8000/api/login/',
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    withCredentials: true,
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
            </div>


            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                {message && (
                    <div className="mb-4 text-green-600 font-medium">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 text-red-600 font-medium">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className='space-y-6'>
                    <div>
                        <label htmlFor='username' className='block text-sm/6 font-medium text-gray-900'>Username</label>
                        <div className='mt-2'>
                            <input
                                id='username'
                                type='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete='username'
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'></input>
                        </div>
                    </div>


                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password</label>
                            <div className='text-sm'>
                                <a href='#' className='font-semibold text-green-600 hover:text-green-500'>Forgot password?</a>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <input
                                id='password'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete='current-password'
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'></input>
                        </div>
                    </div>


                    <div>
                        <button type='submit' className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign in</button>
                    </div>
                </form>


                <p className='mt-10 text-center text-sm/6 text-gray-500'>
                    <Link to="/register" className='font-semibold text-green-600 hover:text-green-500'>
                        Not a member?
                    </Link>                </p>
            </div>

        </div >
    )
}