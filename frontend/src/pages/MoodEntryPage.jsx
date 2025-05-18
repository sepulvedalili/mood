import { useEffect, useState } from 'react';
import MoodSelector from "../components/MoodSelector";
import axios from 'axios';
import Navbar from '../components/Navbar';
import MoodCalendar from '../components/MoodCalendar';

export default function MoodEntryPage() {
    const [mood, setMood] = useState(null);
    const [messageModal, setMessageModal] = useState('');
    const [moods, setMoods] = useState([])

    const fetchMoods = async () => {
        const token = localStorage.getItem('access_token')
        try {
            const res = await axios.get('http://localhost:8000/api/moods/daily-latest/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            setMoods(res.data)
        } catch (err) {
            console.error('Error fetching moods:', err)
        }
    }

    useEffect(() => {
        fetchMoods()
    }, [])


    const handleSubmit = async () => {
        if (!mood) {
            if (messageModal !== 'Please select a mood.') {
                setMessageModal('Please select a mood.');
                setTimeout(() => setMessageModal(''), 1500);
            }
            return;
        }
        const token = localStorage.getItem('access_token');
        try {
            await axios.post(
                'http://localhost:8000/api/mood/',
                {
                    mood: mood,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            await fetchMoods()

            setMessageModal('Mood submitted successfully!');
            setTimeout(() => {
                setMessageModal('');
                setMood(null);
            }, 1500);
        } catch (error) {
            if (messageModal !== 'Failed to submit mood.') {
                setMessageModal('Failed to submit mood.');
                setTimeout(() => setMessageModal(''), 1500);
            } console.error(error);
        }
        setTimeout(() => setMessageModal(''), 1500);

    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Navbar />
            <div className="pt-12 flex items-start">
                <h1 className="text-gray-900 text-3xl font-bold p-2">Mood tracker</h1>
            </div>
            <hr className="border-t-2 border-gray-300 w-full mb-6" />
            <div className="bg-white opacity-90 border border-gray-300 rounded-lg shadow-lg p-4 w-full max-w-lg">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-800'>
                        Journal mood
                    </h2>
                </div>
                <div className='flex justify-center mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <p>How are you feeling today?</p>
                </div>
                < MoodSelector selectedMood={mood} onMoodSelect={setMood} />
                <div className="flex justify-center m-0.5">
                    <button
                        onClick={handleSubmit}
                        disabled={!mood}
                        className="px-6 bg-green-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="pt-12 flex items-start">
                <h1 className="text-gray-900 text-3xl font-bold p-2">Your mood over time</h1>
            </div>
            <hr className=" border-gray-300 w-full mb-6" />
            <div className="flex justify-start">
                <MoodCalendar moodData={moods} />
            </div>
            {messageModal && (
                <div className="fixed top-0 left-0 right-0 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-1 z-50 text-center" role="alert">
                    <h3 className="text-lg font-semibold">{messageModal}</h3>
                </div>
            )}
        </div>
    )
}