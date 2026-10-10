import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientForm() {
  const navigate = useNavigate();

  // Clear previous patient data when the form mounts to prevent data bleed to new scans
  useEffect(() => {
    localStorage.removeItem("patient");
  }, []);

  const [patient, setPatient] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    symptoms: "",
    medicalHistory: "",
    emergencyContact: "",
    doctorName: "Dr. Sharma"
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !patient.patientName ||
      !patient.age ||
      !patient.gender ||
      !patient.phone
    ) {
      alert("Please fill all required fields");
      return;
    }

    localStorage.setItem(
      "patient",
      JSON.stringify(patient)
    );

    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-4xl font-bold mb-2">
          Register Patient
        </h1>

        <p className="text-gray-500 mb-8">
          Enter patient information before MRI analysis
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name *"
            className="border p-4 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age *"
            className="border p-4 rounded-xl"
            onChange={handleChange}
          />

          <select
            name="gender"
            className="border p-4 rounded-xl"
            onChange={handleChange}
          >
            <option value="">
              Select Gender
            </option>

            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            className="border p-4 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            className="border p-4 rounded-xl"
            value={patient.doctorName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            className="border p-4 rounded-xl"
            onChange={handleChange}
          />

        </div>

        <textarea
          name="address"
          rows="3"
          placeholder="Patient Address"
          className="w-full border p-4 rounded-xl mt-5"
          onChange={handleChange}
        />

        <textarea
          name="symptoms"
          rows="4"
          placeholder="Symptoms"
          className="w-full border p-4 rounded-xl mt-5"
          onChange={handleChange}
        />

        <textarea
          name="medicalHistory"
          rows="4"
          placeholder="Medical History"
          className="w-full border p-4 rounded-xl mt-5"
          onChange={handleChange}
        />

        <div className="flex justify-end mt-8">

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"
          >
            Save & Continue →
          </button>

        </div>

      </div>

    </div>
  );
}