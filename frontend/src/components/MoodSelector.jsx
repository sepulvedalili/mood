export default function MoodSelector({ selectedMood, onMoodSelect }) {
    const moods = [
        { name: 'happy', emoji: '😊', color: 'text-yellow-500' },
        { name: 'neutral', emoji: '😐', color: 'text-gray-500' },
        { name: 'sad', emoji: '😢', color: 'text-blue-500' },
    ];
    return (

        <div className='flex min-h-full flex-col justify-center px-6 py-6 lg:px-8' >
            <div className="flex justify-center gap-6 mt-6">
                {moods.map((mood) => (
                    <div
                        key={mood.name}
                        onClick={() => onMoodSelect(mood.name)}
                        className={`w-16 h-16 flex items-center justify-center text-5xl cursor-pointer transition-all duration-300 rounded-full
                       ${selectedMood === mood.name
                                ? `bg-green-100 scale-120 ring-2 ring-green-500 ${mood.color}`
                                : 'bg-gray-100 hover:scale-120 hover:ring-2 hover:ring-green-300'
                            }`}
                    >
                        {mood.emoji}
                    </div>
                ))}
            </div>

        </div>
    )
}