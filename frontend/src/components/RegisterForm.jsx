import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    const navigate = useNavigate();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/register/', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    withCredentials: true,
                }
            );
            setSuccessMessage(response.data.message || 'Account created!');
            setSuccessModal(true);

            setFormData({
                username: '',
                password: '',
                email: ''
            });

            setTimeout(() => {
                setSuccessModal(false);
                navigate('/login');
            }, 1500);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                    Create a new account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                {error && (
                    <div className="mb-4 text-red-600 font-medium">
                        {error.includes("already exists") ? "Este nombre de usuario ya está en uso." : error}
                    </div>
                )}
                <form onSubmit={handleRegister} className='space-y-6'>
                    <div>
                        <label htmlFor='username' className='block text-sm/6 font-medium text-gray-900'>
                            Username
                        </label>
                        <div className='mt-2'>
                            <input
                                id='username'
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>
                            Email
                        </label>
                        <div className='mt-2'>
                            <input
                                id='email'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>
                            Password
                        </label>
                        <div className='mt-2'>
                            <input
                                id='password'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm/6 text-gray-500'>
                    Already have an account?{' '}
                    <Link to="/login" className='font-semibold text-green-600 hover:text-green-500'>
                        Sign in
                    </Link>
                </p>

            </div>
            {successModal && (
                <div className="fixed top-0 left-0 right-0 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-1 z-50 text-center" role="alert">
                    <h3 className="text-lg font-semibold">{successMessage}</h3>
                </div>
            )}
        </div>

    )

}