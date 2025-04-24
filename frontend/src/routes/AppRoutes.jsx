import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoodEntryPage from "../pages/MoodEntryPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoodEntryPage />} />
            </Routes>
        </BrowserRouter>
    );
}
