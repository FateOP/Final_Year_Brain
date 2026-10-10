import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PatientForm from "./pages/PatientForm.jsx";
import UploadMRI from "./pages/UploadMRI.jsx";
import Processing from "./pages/Processing.jsx";
import Result from "./pages/Result.jsx";
import Reports from "./pages/Reports.jsx";
import Analytics from "./pages/Analytics.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-form" element={<PatientForm />} />
        <Route path="/upload" element={<UploadMRI />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/result" element={<Result />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}