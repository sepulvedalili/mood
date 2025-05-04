import RegisterForm from "../components/RegisterForm";
import AuthSideBar from "../components/AuthSideBar";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white opacity-90 border border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-lg">
                <RegisterForm />
            </div>
        </div>
    )

}