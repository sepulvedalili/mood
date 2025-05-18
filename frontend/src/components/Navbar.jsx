import mood_logo from '../assets/img/mood_logo.png';
export default function Navbar() {
    return (
        <nav className="bg-green-500 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <img
                    src={mood_logo}
                    alt="Mood Logo"
                    className="w-10 h-10"
                />
                <button className="text-sm text-white hover:underline">Logout</button>
            </div>
        </nav>
    )
}