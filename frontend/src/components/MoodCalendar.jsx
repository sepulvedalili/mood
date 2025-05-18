import React, { useState } from 'react'
import Calendar from 'react-calendar'

const moodEmoji = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
}

const MoodCalendar = ({ moodData }) => {
    const [value, setValue] = useState(new Date())

    const getEmojiForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0] // YYYY-MM-DD
        const moodEntry = moodData.find(
            (item) => item.created_at && item.created_at.startsWith(formattedDate)
        )
        return moodEntry ? moodEmoji[moodEntry.mood] : ''
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Mood Calendar</h2>
                <Calendar
                    onChange={setValue}
                    value={value}
                    tileContent={({ date, view }) =>
                        view === 'month' ? (
                            <div className="text-xl text-center">{getEmojiForDate(date)}</div>
                        ) : null

                    }
                    prev2Label={null}
                    next2Label={null}
                    prevLabel={
                        <span className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 text-lg font-semibold text-gray-800">{"<"}</span>
                    }
                    nextLabel={
                        <span className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 text-lg font-semibold text-gray-800">{">"}</span>
                    }
                    className="text-center font-bold"
                    tileClassName="flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-xl text-gray-600 border border-gray-200"
                    navigationLabel={({ date }) => (
                        <span className="font-semibold text-2xl text-gray-700 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                            {date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                    )}
                />
            </div>
        </div>
    );

}

export default MoodCalendar
