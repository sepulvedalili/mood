import { useState } from 'react'
import MoodSelector from "../components/MoodSelector";
import axios from 'axios';

export default function MoodEntryPage() {
    const [mood, setMood] = useState(null);
    const [messageModal, setMessageModal] = useState('');

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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white opacity-90 border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                        Journal mood
                    </h2>
                </div>
                <div className='flex justify-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <p>How are you feeling today?</p>
                </div>
                < MoodSelector selectedMood={mood} onMoodSelect={setMood} />
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        disabled={!mood}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {messageModal && (
                <div className="fixed top-0 left-0 right-0 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-1 z-50 text-center" role="alert">
                    <h3 className="text-lg font-semibold">{messageModal}</h3>
                </div>
            )}
        </div>
    )
}