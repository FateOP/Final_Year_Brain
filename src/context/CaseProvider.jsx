import { useCallback, useMemo, useRef, useState } from "react";
import { CaseContext } from "./caseContext";

const RECORDS_KEY = "neuroai_reports";
const DOCTOR_KEY = "neuroai_doctor";

function loadRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECORDS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(records) {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch {
    // storage full or unavailable
  }
}

function loadDoctor() {
  try {
    return sessionStorage.getItem(DOCTOR_KEY);
  } catch {
    return null;
  }
}

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

export function CaseProvider({ children }) {
  const [doctor, setDoctor] = useState(loadDoctor);
  const [patient, setPatient] = useState(null); // in memory only
  const [scan, setScan] = useState(null); // { file, preview }
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState(loadRecords);
  const previewRef = useRef(null);

  const revoke = useCallback(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
  }, []);

  const selectFile = useCallback(
    (file) => {
      revoke();
      setResult(null);
      if (!file) {
        setScan(null);
        return;
      }
      previewRef.current = URL.createObjectURL(file);
      setScan({ file, preview: previewRef.current });
    },
    [revoke]
  );

  const startCase = useCallback(
    (newPatient) => {
      revoke();
      setScan(null);
      setResult(null);
      setPatient(newPatient);
    },
    [revoke]
  );

  const endCase = useCallback(() => {
    revoke();
    setScan(null);
    setResult(null);
    setPatient(null);
  }, [revoke]);

  const login = useCallback((name) => {
    try {
      sessionStorage.setItem(DOCTOR_KEY, name);
    } catch {
      // ignore storage errors
    }
    setDoctor(name);
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(DOCTOR_KEY);
    } catch {
      // ignore storage errors
    }
    endCase();
    setDoctor(null);
  }, [endCase]);

  const addRecord = useCallback(
    (record) => {
      const entry = { id: newId(), date: new Date().toISOString(), ...record };
      const next = [entry, ...records];
      setRecords(next);
      persist(next);
      return entry.id;
    },
    [records]
  );

  const removeRecord = useCallback(
    (id) => {
      const next = records.filter((r) => r.id !== id);
      setRecords(next);
      persist(next);
    },
    [records]
  );

  const value = useMemo(
    () => ({
      doctor, login, logout,
      patient, startCase, endCase,
      scan, selectFile,
      result, setResult,
      records, addRecord, removeRecord,
    }),
    [doctor, login, logout, patient, startCase, endCase, scan, selectFile, result, records, addRecord, removeRecord]
  );

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}