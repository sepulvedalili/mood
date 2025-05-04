import mood_logo from '../assets/img/mood_logo.png';

export default function AuthSideBar() {
    return (
        <div className="flex flex-col justify-between h-full p-40 text-white">
            <div>
                <img
                    src={mood_logo}
                    alt="Mood Logo"
                    className="w-20 h-20 mb-6"
                />
                <h1 className="text-4xl font-bold mb-2">Mood</h1>
                <h5 className="text-lg font-light">
                    Track your mood. Understand your productivity
                </h5>
            </div>

            <div className="text-sm">
                <p>MOOD is an app that helps you track your mood and productivity on a daily basis.</p>
            </div>
        </div>
    )
}