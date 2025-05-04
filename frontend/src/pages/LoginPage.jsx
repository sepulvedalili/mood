import LoginForm from "../components/LoginForm"
import AuthSideBar from "../components/AuthSideBar"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-green-700 flex items-center justify-center">
                <AuthSideBar />
            </div>

            <div className="w-1/2 flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-white opacity-90 border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-lg">
                    <LoginForm />
                </div>
            </div>
        </div>

    )
}