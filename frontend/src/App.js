import React, { useState, useEffect } from "react";
import "./App.css";

const vaccineSchedule = {
  "At Birth": [
    { name: "Hepatitis B — Dose 1", desc: "Protects against Hepatitis B liver disease", info: "Prevents liver disease caused by HBV. 3-dose series. First dose given at birth.", side: "Mild soreness at injection site." },
    { name: "BCG", desc: "Protects against Tuberculosis", info: "Bacillus Calmette-Guérin vaccine. Protects against TB and leprosy.", side: "Small scar at injection site is normal." },
    { name: "OPV-0", desc: "First oral polio dose", info: "Oral Polio Vaccine zero dose. Provides early gut immunity.", side: "No side effects." },
  ],
  "2 Months": [
    { name: "DTwP — Dose 1", desc: "Diphtheria, Tetanus & Pertussis", info: "Protects against Diphtheria, Tetanus and Whooping Cough.", side: "Mild fever and soreness common." },
    { name: "Hib — Dose 1", desc: "Haemophilus influenzae type b", info: "Prevents meningitis, pneumonia caused by Hib bacteria.", side: "Mild redness at site." },
    { name: "Rotavirus — Dose 1", desc: "Prevents severe diarrhea", info: "Oral vaccine that prevents severe rotavirus gastroenteritis.", side: "No major side effects." },
    { name: "PCV — Dose 1", desc: "Pneumococcal protection", info: "Prevents pneumonia, meningitis and ear infections.", side: "Mild fever possible." },
  ],
  "4 Months": [
    { name: "DTwP — Dose 2", desc: "Booster for DTP protection", info: "Second dose strengthens immunity built at 2 months.", side: "Mild soreness expected." },
    { name: "IPV — Dose 1", desc: "Inactivated Polio Vaccine", info: "Injectable Polio Vaccine. Prevents all 3 types of polio.", side: "Mild soreness at site." },
    { name: "PCV — Dose 2", desc: "Pneumococcal booster", info: "Second dose of Pneumococcal Conjugate Vaccine.", side: "Mild fever possible." },
  ],
  "6 Months": [
    { name: "Hepatitis B — Dose 3", desc: "Final HepB dose", info: "Final dose completes full immunity against Hepatitis B.", side: "Mild soreness." },
    { name: "Influenza — Dose 1", desc: "Annual flu vaccine", info: "Annual flu vaccine. Children under 9 need 2 doses in first year.", side: "Mild arm soreness or low fever." },
  ],
  "12-15 Months": [
    { name: "MMR — Dose 1", desc: "Measles, Mumps & Rubella", info: "Protects against Measles, Mumps and Rubella. Given as 2 doses.", side: "Mild fever or rash for 1-2 days." },
    { name: "Varicella — Dose 1", desc: "Chickenpox vaccine", info: "Prevents 90% of chickenpox cases and nearly all severe disease.", side: "Mild soreness at site." },
    { name: "Hepatitis A — Dose 1", desc: "Liver disease protection", info: "Prevents Hepatitis A liver infection. 2 doses, 6 months apart.", side: "Mild soreness, low-grade fever." },
  ],
  "4-6 Years": [
    { name: "MMR — Dose 2", desc: "Booster for measles protection", info: "Second MMR dose boosts immunity to near 100%.", side: "Mild fever or rash possible." },
    { name: "DTaP — Dose 5", desc: "Pre-school DTP booster", info: "Important booster before child enters school environment.", side: "Mild soreness." },
    { name: "Varicella — Dose 2", desc: "Chickenpox booster", info: "Provides stronger and longer-lasting immunity.", side: "Mild soreness at site." },
  ],
};

const vaccineCalendarData = [
  { name: "Hepatitis B — Dose 1", daysAfterBirth: 0 },
  { name: "BCG", daysAfterBirth: 0 },
  { name: "OPV-0", daysAfterBirth: 0 },
  { name: "DTwP — Dose 1", daysAfterBirth: 60 },
  { name: "Hib — Dose 1", daysAfterBirth: 60 },
  { name: "Rotavirus — Dose 1", daysAfterBirth: 60 },
  { name: "PCV — Dose 1", daysAfterBirth: 60 },
  { name: "DTwP — Dose 2", daysAfterBirth: 120 },
  { name: "IPV — Dose 1", daysAfterBirth: 120 },
  { name: "PCV — Dose 2", daysAfterBirth: 120 },
  { name: "Hepatitis B — Dose 3", daysAfterBirth: 180 },
  { name: "Influenza — Dose 1", daysAfterBirth: 180 },
  { name: "MMR — Dose 1", daysAfterBirth: 365 },
  { name: "Varicella — Dose 1", daysAfterBirth: 365 },
  { name: "Hepatitis A — Dose 1", daysAfterBirth: 365 },
  { name: "MMR — Dose 2", daysAfterBirth: 548 },
  { name: "DTaP — Dose 5", daysAfterBirth: 548 },
  { name: "Varicella — Dose 2", daysAfterBirth: 548 },
];

const clinicsData = [
  { name: "City Children's Hospital", area: "Pimpri", dist: "0.8 km", hours: "Mon–Sat 9AM–5PM", status: "Open", free: false },
  { name: "Little Stars Clinic", area: "Chinchwad", dist: "1.4 km", hours: "Mon–Sat 10AM–6PM", status: "Open", free: false },
  { name: "Rainbow Pediatrics", area: "Akurdi", dist: "2.1 km", hours: "Mon–Fri 9AM–4PM", status: "Closing soon", free: false },
  { name: "Sunshine Health Centre", area: "Nigdi", dist: "3.2 km", hours: "Mon–Sun 8AM–8PM", status: "Open", free: false },
  { name: "Govt. Primary Health Centre", area: "Pimpri", dist: "1.1 km", hours: "Mon–Sat 9AM–4PM", status: "Open", free: true },
];

const languages = {
  en: { dashboard: "Dashboard", schedule: "Vaccine Schedule", booking: "Book a Slot", findClinics: "Find Clinics", reminders: "Reminders", history: "History", calculator: "Due Dates", profile: "Profile", bookBtn: "Confirm Booking", childName: "Child's Name", ageGroup: "Age Group", selectVaccine: "Select Vaccine", date: "Preferred Date", timeSlot: "Time Slot", clinic: "Clinic", contact: "Parent Contact", notes: "Doctor Notes (optional)", progress: "Vaccination Progress", upcoming: "Upcoming Vaccines", completed: "Completed", dueSoon: "Due Soon", total: "Total Vaccines" },
  hi: { dashboard: "डैशबोर्ड", schedule: "टीका शेड्यूल", booking: "स्लॉट बुक करें", findClinics: "क्लिनिक खोजें", reminders: "अनुस्मारक", history: "इतिहास", calculator: "नियत तारीखें", profile: "प्रोफ़ाइल", bookBtn: "बुकिंग की पुष्टि करें", childName: "बच्चे का नाम", ageGroup: "आयु समूह", selectVaccine: "टीका चुनें", date: "पसंदीदा तारीख", timeSlot: "समय स्लॉट", clinic: "क्लिनिक", contact: "अभिभावक संपर्क", notes: "डॉक्टर नोट्स", progress: "टीकाकरण प्रगति", upcoming: "आगामी टीके", completed: "पूर्ण", dueSoon: "जल्द देय", total: "कुल टीके" },
  mr: { dashboard: "डॅशबोर्ड", schedule: "लस वेळापत्रक", booking: "स्लॉट बुक करा", findClinics: "दवाखाना शोधा", reminders: "स्मरणपत्रे", history: "इतिहास", calculator: "देय तारखा", profile: "प्रोफाइल", bookBtn: "बुकिंग निश्चित करा", childName: "मुलाचे नाव", ageGroup: "वयोगट", selectVaccine: "लस निवडा", date: "पसंतीची तारीख", timeSlot: "वेळ स्लॉट", clinic: "दवाखाना", contact: "पालक संपर्क", notes: "डॉक्टर नोट्स", progress: "लसीकरण प्रगती", upcoming: "आगामी लसी", completed: "पूर्ण", dueSoon: "लवकरच देय", total: "एकूण लसी" },
};

const BACKEND = "https://vaccicare-backend.onrender.com";

const getTheme = (dark) => ({
  bg: dark ? "#1a1a2e" : "#f5f5f5",
  card: dark ? "#16213e" : "#fff",
  border: dark ? "#0f3460" : "#eee",
  text: dark ? "#e0e0e0" : "#333",
  subtext: dark ? "#a0a0a0" : "#888",
  inputBg: dark ? "#0f3460" : "#fff",
  inputBorder: dark ? "#1D9E75" : "#ddd",
  tabInactive: dark ? "#16213e" : "#f5f5f5",
  tabTextInactive: dark ? "#a0a0a0" : "#555",
});

// ✅ Toast Component
function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "12px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500,
          background: t.type === "success" ? "#1D9E75" : t.type === "error" ? "#A32D2D" : "#185FA5",
          color: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          animation: "slideInRight 0.3s ease",
          minWidth: 220, maxWidth: 320
        }}>
          {t.type === "success" ? "✅ " : t.type === "error" ? "❌ " : "ℹ️ "}{t.message}
        </div>
      ))}
    </div>
  );
}

// ✅ Spinner Component
function Spinner() {
  return (
    <div style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: 8, verticalAlign: "middle" }} />
  );
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [authError, setAuthError] = useState("");
  const [lang, setLang] = useState("en");
  const [ageTab, setAgeTab] = useState("At Birth");
  const [children, setChildren] = useState([]);
  const [activeChild, setActiveChild] = useState(0);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChild, setNewChild] = useState({ name: "", age: "", blood: "A+" });
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [booking, setBooking] = useState({ name: "", age: "", vaccine: "", date: "", time: "", clinic: "", contact: "", notes: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [reminders, setReminders] = useState({ r1: true, r2: true, r3: true, r4: false, r5: true, r6: false });
  const [adminStats, setAdminStats] = useState(null);
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminTab, setAdminTab] = useState("stats");
  const [userBookings, setUserBookings] = useState([]);
  const [clinicSearch, setClinicSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverWaking, setServerWaking] = useState(false);
  const [dob, setDob] = useState("");
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const T = getTheme(darkMode);
  const L = languages[lang];
  const child = children[activeChild] || { name: "No child", age: "-", blood: "-", done: 0, total: 18 };
  const pct = Math.round((child.done / child.total) * 100) || 0;
  const statusColor = { "Open": "#3B6D11", "Closing soon": "#854F0B" };
  const statusBg = { "Open": "#EAF3DE", "Closing soon": "#FAEEDA" };
  const isAdmin = currentUser?.role === "admin";

  const cardStyle = { background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" };
  const inputStyle = { width: "100%", padding: "9px 12px", border: `1px solid ${T.inputBorder}`, borderRadius: 8, fontSize: 14, marginBottom: 10, fontFamily: "sans-serif", boxSizing: "border-box", background: T.inputBg, color: T.text };
  const btnStyle = { width: "100%", padding: 10, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" };
  const labelStyle = { fontSize: 12, color: T.subtext, marginBottom: 3, display: "block" };

  // ✅ Toast function
  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }

  const filteredClinics = clinicsData.filter(c =>
    c.name.toLowerCase().includes(clinicSearch.toLowerCase()) ||
    c.area.toLowerCase().includes(clinicSearch.toLowerCase())
  );

  useEffect(() => {
    if (isLoggedIn && !isAdmin) { fetchChildren(); fetchUserBookings(); }
    if (isAdmin && isLoggedIn) fetchAdminData();
  }, [isLoggedIn, isAdmin]);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({ name: currentUser.name || "", email: currentUser.email || "", phone: currentUser.phone || "" });
    }
  }, [currentUser]);

  async function fetchChildren() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/children`, { headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success && data.children.length > 0) { setChildren(data.children); setActiveChild(0); }
    } catch (err) { console.log("Fetch children error:", err); }
  }

  async function fetchUserBookings() {
    setDataLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/bookings`, { headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setUserBookings(data.bookings);
    } catch (err) { console.log("Fetch bookings error:", err); }
    setDataLoading(false);
  }

  async function fetchAdminData() {
    setDataLoading(true);
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
    try {
      const [statsRes, bookingsRes, usersRes] = await Promise.all([
        fetch(`${BACKEND}/api/admin/stats`, { headers }),
        fetch(`${BACKEND}/api/admin/bookings`, { headers }),
        fetch(`${BACKEND}/api/admin/users`, { headers })
      ]);
      setAdminStats(await statsRes.json());
      setAdminBookings(await bookingsRes.json());
      setAdminUsers(await usersRes.json());
    } catch (err) { console.log("Admin fetch error:", err); }
    setDataLoading(false);
  }

  async function updateBookingStatus(id, status) {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${BACKEND}/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      fetchAdminData();
      showToast(`Booking marked as ${status}!`);
    } catch (err) { showToast("Update failed!", "error"); }
  }

  async function handleAuth() {
    setAuthError(""); setLoading(true); setServerWaking(true);
    try {
      const url = authMode === "login" ? `${BACKEND}/api/auth/login` : `${BACKEND}/api/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm)
      });
      const data = await response.json();
      if (data.success) {
        const userData = { name: data.user.name, email: data.user.email, phone: data.user.phone || "", role: data.user.role || "parent" };
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true); setCurrentUser(userData);
        showToast(`Welcome, ${data.user.name}! 👋`);
      } else { setAuthError(data.error); }
    } catch (err) { setAuthError("Server is waking up, please try again in 30 seconds!"); }
    setLoading(false); setServerWaking(false);
  }

  function handleLogout() {
    localStorage.removeItem("token"); localStorage.removeItem("user");
    setIsLoggedIn(false); setCurrentUser(null); setChildren([]); setUserBookings([]);
    setShowLanding(true);
    showToast("Logged out successfully!", "info");
  }

  function handleSaveProfile() {
    if (!profileForm.name) { showToast("Name cannot be empty!", "error"); return; }
    const updatedUser = { ...currentUser, name: profileForm.name, phone: profileForm.phone };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setProfileEdit(false);
    setProfileSaved(true);
    showToast("Profile updated successfully!");
    setTimeout(() => setProfileSaved(false), 3000);
  }

  async function handleBook() {
    if (!booking.name || !booking.vaccine || !booking.date || !booking.time || !booking.clinic) {
      showToast("Please fill all required fields!", "error"); return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ childName: booking.name, age: booking.age, vaccine: booking.vaccine, date: booking.date, time: booking.time, clinic: booking.clinic, contact: booking.contact, notes: booking.notes })
      });
      const data = await response.json();
      if (data.success) {
        setBookingSuccess(true); fetchUserBookings();
        showToast("Booking confirmed successfully!");
        if (currentUser?.email) {
          try {
            const emailRes = await fetch(`${BACKEND}/api/email/send`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ to: currentUser.email, childName: booking.name, vaccine: booking.vaccine, date: booking.date, time: booking.time, clinic: booking.clinic })
            });
            const emailData = await emailRes.json();
            if (emailData.success) { setEmailSent(true); showToast("Confirmation email sent! 📧"); }
          } catch (err) { console.log('Email error:', err); }
        }
        if (booking.contact) {
          try {
            const phone = booking.contact.replace(/\D/g, '').slice(-10);
            const smsRes = await fetch(`${BACKEND}/api/sms/send`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone, childName: booking.name, vaccine: booking.vaccine, date: booking.date, time: booking.time, lang })
            });
            const smsData = await smsRes.json();
            if (smsData.success) setSmsSent(true);
          } catch (err) { console.log("SMS error:", err); }
        }
      } else { showToast("Booking failed! Try again.", "error"); }
    } catch (err) { showToast("Cannot connect to server!", "error"); }
    setLoading(false);
  }

  async function handleCancelBooking(bookingId) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/bookings/${bookingId}/cancel`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) { fetchUserBookings(); showToast("Booking cancelled successfully!"); }
      else { showToast(data.error || "Failed to cancel!", "error"); }
    } catch (err) { showToast("Cannot connect to server!", "error"); }
  }

  async function handleAddChild() {
    if (!newChild.name || !newChild.age) { showToast("Please enter name and age!", "error"); return; }
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/children`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(newChild)
      });
      const data = await res.json();
      if (data.success) {
        setChildren([...children, data.child]); setActiveChild(children.length);
        setShowAddChild(false); setNewChild({ name: "", age: "", blood: "A+" });
        showToast(`${newChild.name}'s profile added!`);
      }
    } catch (err) { showToast("Failed to add child!", "error"); }
  }

  async function handleDeleteChild(childId, childName) {
    if (!window.confirm("Remove this child profile?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BACKEND}/api/children/${childId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const updated = children.filter(c => c._id !== childId);
        setChildren(updated); setActiveChild(0);
        showToast(`${childName}'s profile removed!`);
      }
    } catch (err) { showToast("Failed to remove child!", "error"); }
  }

  function handleExportPDF() {
    const printWindow = window.open("", "_blank");
    const historyToShow = userBookings.length > 0 ? userBookings : [];
    printWindow.document.write(`
      <html><head><title>VacciCare Certificate - ${child.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        h1 { color: #1D9E75; font-size: 28px; margin-bottom: 4px; }
        h2 { font-size: 16px; color: #555; font-weight: normal; margin-bottom: 24px; }
        .info { background: #f5f5f5; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { background: #1D9E75; color: white; padding: 10px 12px; text-align: left; }
        td { padding: 9px 12px; border-bottom: 1px solid #eee; }
        tr:nth-child(even) { background: #f9f9f9; }
        .footer { margin-top: 32px; font-size: 11px; color: #aaa; text-align: center; }
        .badge { display: inline-block; background: #EAF3DE; color: #3B6D11; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
      </style></head><body>
      <h1>💉 VacciCare</h1><h2>Vaccination Certificate</h2>
      <div class="info">
        <strong>Child:</strong> ${child.name} &nbsp;&nbsp;
        <strong>Age:</strong> ${child.age} &nbsp;&nbsp;
        <strong>Blood Group:</strong> ${child.blood}<br/>
        <strong>Generated:</strong> ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </div>
      <table><thead><tr><th>Vaccine</th><th>Date</th><th>Clinic</th><th>Status</th></tr></thead>
      <tbody>${historyToShow.map(b => `<tr><td>${b.vaccine}</td><td>${b.date}</td><td>${b.clinic}</td><td><span class="badge">${b.status} ✓</span></td></tr>`).join("")}</tbody>
      </table>
      <div class="footer">This certificate is generated by VacciCare. Please verify with your pediatrician.<br/>vaccicare-app.vercel.app</div>
      </body></html>
    `);
    printWindow.document.close(); printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    showToast("PDF certificate generated!");
  }

  // ✅ LANDING PAGE
  if (showLanding && !isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: darkMode ? "#1a1a2e" : "#fff", fontFamily: "sans-serif", transition: "background 0.3s" }}>
        <Toast toasts={toasts} />
        {/* Navbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: `1px solid ${darkMode ? "#0f3460" : "#eee"}` }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1D9E75" }}>💉 VacciCare</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid #ccc", background: "transparent", color: darkMode ? "#fff" : "#555", cursor: "pointer", fontSize: 13 }}>{darkMode ? "☀️" : "🌙"}</button>
            <button onClick={() => setShowLanding(false)} style={{ padding: "8px 20px", borderRadius: 20, border: "1px solid #1D9E75", background: "transparent", color: "#1D9E75", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Login</button>
            <button onClick={() => setShowLanding(false)} style={{ padding: "8px 20px", borderRadius: 20, border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Sign Up Free</button>
          </div>
        </div>
        {/* Hero */}
        <div style={{ textAlign: "center", padding: "4rem 2rem 3rem", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#E1F5EE", color: "#0F6E56", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, marginBottom: 20 }}>🇮🇳 Made for Indian Parents</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: darkMode ? "#e0e0e0" : "#1a1a1a", lineHeight: 1.2, marginBottom: 16 }}>
            Never Miss Your Child's <span style={{ color: "#1D9E75" }}>Vaccine</span> Again
          </h1>
          <p style={{ fontSize: 17, color: darkMode ? "#a0a0a0" : "#666", lineHeight: 1.7, marginBottom: 32 }}>
            VacciCare helps Indian parents track, book, and manage their children's vaccinations. Get email reminders, PDF certificates, and more — completely free.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowLanding(false)} style={{ padding: "14px 32px", borderRadius: 30, border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 600, boxShadow: "0 4px 15px rgba(29,158,117,0.4)" }}>Get Started Free →</button>
            <button onClick={() => setShowLanding(false)} style={{ padding: "14px 32px", borderRadius: 30, border: "2px solid #1D9E75", background: "transparent", color: "#1D9E75", cursor: "pointer", fontSize: 16, fontWeight: 600 }}>Login</button>
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: darkMode ? "#a0a0a0" : "#999" }}>✅ Free forever &nbsp;·&nbsp; ✅ No credit card &nbsp;·&nbsp; ✅ Works in Hindi & Marathi</div>
        </div>
        {/* Stats */}
        <div style={{ background: "#1D9E75", padding: "1.5rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", maxWidth: 700, margin: "0 auto" }}>
            {[["18+", "Vaccines Tracked"], ["3", "Languages"], ["100%", "Free Forever"]].map(([n, l], i) => (
              <div key={i} style={{ textAlign: "center", color: "#fff" }}>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Features */}
        <div style={{ padding: "3rem 2rem", maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, color: darkMode ? "#e0e0e0" : "#1a1a1a", marginBottom: 8 }}>Everything You Need</h2>
          <p style={{ textAlign: "center", color: darkMode ? "#a0a0a0" : "#888", marginBottom: 40, fontSize: 15 }}>All vaccine management features in one place</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[["📅", "Smart Booking", "Book vaccine slots at nearby clinics in seconds"],
              ["📧", "Email Reminders", "Get confirmation emails after every booking"],
              ["📱", "SMS Alerts", "Receive SMS reminders before appointments"],
              ["📄", "PDF Certificate", "Download vaccination certificates instantly"],
              ["🧮", "Due Date Calculator", "Enter DOB and see all vaccine due dates"],
              ["👨‍👩‍👧", "Multi-child Support", "Manage profiles for all your children"],
              ["🌙", "Dark Mode", "Easy on eyes, day or night"],
              ["🌐", "3 Languages", "English, Hindi, and Marathi support"],
              ["👑", "Admin Panel", "Full dashboard for clinic administrators"]].map(([icon, title, desc], i) => (
              <div key={i} style={{ background: darkMode ? "#16213e" : "#f9f9f9", borderRadius: 12, padding: "1.5rem", border: `1px solid ${darkMode ? "#0f3460" : "#eee"}` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: darkMode ? "#e0e0e0" : "#1a1a1a", marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: darkMode ? "#a0a0a0" : "#888", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* How it works */}
        <div style={{ background: darkMode ? "#16213e" : "#f5f5f5", padding: "3rem 2rem" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: darkMode ? "#e0e0e0" : "#1a1a1a", marginBottom: 8 }}>How It Works</h2>
            <p style={{ color: darkMode ? "#a0a0a0" : "#888", marginBottom: 40, fontSize: 15 }}>Get started in 3 simple steps</p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              {[["1", "Sign Up Free", "Create your account in 30 seconds"],
                ["2", "Add Children", "Add your child's profile and details"],
                ["3", "Book & Track", "Book vaccines and get reminders automatically"]].map(([num, title, desc], i) => (
                <div key={i} style={{ flex: 1, minWidth: 180, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1D9E75", color: "#fff", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{num}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: darkMode ? "#e0e0e0" : "#1a1a1a", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 13, color: darkMode ? "#a0a0a0" : "#888" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CTA */}
        <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: darkMode ? "#e0e0e0" : "#1a1a1a", marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ color: darkMode ? "#a0a0a0" : "#888", marginBottom: 24, fontSize: 15 }}>Join parents who trust VacciCare for their children's health</p>
          <button onClick={() => setShowLanding(false)} style={{ padding: "14px 40px", borderRadius: 30, border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 600, boxShadow: "0 4px 15px rgba(29,158,117,0.4)" }}>Create Free Account →</button>
        </div>
        {/* Footer */}
        <div style={{ borderTop: `1px solid ${darkMode ? "#0f3460" : "#eee"}`, padding: "1.5rem 2rem", textAlign: "center" }}>
          <div style={{ fontSize: 14, color: darkMode ? "#a0a0a0" : "#888" }}>
            💉 VacciCare — Kids Vaccine Planner & Booking &nbsp;·&nbsp; Made with ❤️ in India &nbsp;·&nbsp;
            <span style={{ color: "#1D9E75" }}>vaccicare-app.vercel.app</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
        <Toast toasts={toasts} />
        <div style={{ maxWidth: 400, width: "100%", margin: "1rem", padding: "2rem", background: T.card, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1D9E75" }}>💉 VacciCare</div>
            <div style={{ fontSize: 13, color: T.subtext, marginTop: 4 }}>Kids vaccine planner & booking</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: T.text, marginTop: 16 }}>{authMode === "login" ? "Welcome back! 👋" : "Create your account 🎉"}</div>
          </div>
          {serverWaking && <div style={{ background: "#FFF8E1", color: "#856404", padding: "10px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12 }}>⏳ Server is waking up, please wait 30 seconds...</div>}
          {authError && <div style={{ background: "#FCEBEB", color: "#A32D2D", padding: "10px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12 }}>{authError}</div>}
          {authMode === "signup" && (<>
            <label style={labelStyle}>Full Name</label>
            <input placeholder="Your full name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} style={inputStyle} />
            <label style={labelStyle}>Phone Number</label>
            <input placeholder="+91 XXXXX XXXXX" value={authForm.phone} onChange={e => setAuthForm({ ...authForm, phone: e.target.value })} style={inputStyle} />
          </>)}
          <label style={labelStyle}>Email</label>
          <input type="email" placeholder="your@email.com" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Password</label>
<div style={{ position: "relative", marginBottom: 10 }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    value={authForm.password}
    onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
    style={{ ...inputStyle, marginBottom: 0, paddingRight: 44 }}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: T.subtext, padding: 0, lineHeight: 1 }}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>
          <button onClick={handleAuth} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? <><Spinner />Please wait...</> : authMode === "login" ? "Login" : "Sign Up"}
          </button>
          <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: T.subtext }}>
            {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }} style={{ color: "#1D9E75", cursor: "pointer", fontWeight: 500 }}>
              {authMode === "login" ? "Sign Up" : "Login"}
            </span>
          </div>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span onClick={() => setShowLanding(true)} style={{ fontSize: 12, color: T.subtext, cursor: "pointer" }}>← Back to home</span>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, transition: "background 0.3s" }}>
        <Toast toasts={toasts} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif", color: T.text }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75" }}>💉 VacciCare Admin</div>
              <div style={{ fontSize: 13, color: T.subtext }}>Welcome, {currentUser?.name} 👑</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid #ccc", background: darkMode ? "#1D9E75" : T.tabInactive, color: darkMode ? "#fff" : T.tabTextInactive, cursor: "pointer", fontSize: 13 }}>{darkMode ? "☀️" : "🌙"}</button>
              <button onClick={handleLogout} style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid #ddd", background: T.tabInactive, color: "#A32D2D", cursor: "pointer", fontSize: 13 }}>Logout</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {[["stats", "📊 Dashboard"], ["bookings", "📋 All Bookings"], ["users", "👥 Users"]].map(([id, label]) => (
              <button key={id} onClick={() => setAdminTab(id)} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid #ccc", background: adminTab === id ? "#1D9E75" : T.tabInactive, color: adminTab === id ? "#fff" : T.tabTextInactive, fontSize: 13, cursor: "pointer" }}>{label}</button>
            ))}
          </div>
          {dataLoading && <div style={{ textAlign: "center", padding: "2rem", color: T.subtext }}>⏳ Loading data...</div>}
          {!dataLoading && adminTab === "stats" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: "1.5rem" }}>
                {adminStats ? [
                  [adminStats.totalBookings, "Total Bookings", "#E6F1FB", "#0C447C"],
                  [adminStats.todayBookings, "Today's Bookings", "#EAF3DE", "#3B6D11"],
                  [adminStats.confirmedBookings, "Confirmed", "#EEEDFE", "#3C3489"],
                  [adminStats.totalUsers, "Registered Parents", "#FAEEDA", "#854F0B"],
                ].map(([n, l, bg, color], i) => (
                  <div key={i} style={{ background: bg, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color }}>{n}</div>
                    <div style={{ fontSize: 13, color, marginTop: 4 }}>{l}</div>
                  </div>
                )) : <div style={{ color: T.subtext, fontSize: 14 }}>Loading stats...</div>}
              </div>
              <div style={cardStyle}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Recent Bookings</div>
                {adminBookings.slice(0, 5).map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{b.childName}</div>
                      <div style={{ fontSize: 12, color: T.subtext }}>{b.vaccine} · {new Date(b.date).toLocaleDateString("en-IN")}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: b.status === "Confirmed" ? "#EAF3DE" : "#FAEEDA", color: b.status === "Confirmed" ? "#3B6D11" : "#854F0B", fontWeight: 500 }}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!dataLoading && adminTab === "bookings" && (
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>All Bookings ({adminBookings.length})</div>
              {adminBookings.length === 0 ? <div style={{ color: T.subtext, fontSize: 14 }}>No bookings yet</div> :
                adminBookings.map((b, i) => (
                  <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{b.childName} · {b.age}</div>
                        <div style={{ fontSize: 12, color: T.subtext, marginTop: 2 }}>{b.vaccine}</div>
                        <div style={{ fontSize: 12, color: T.subtext }}>{new Date(b.date).toLocaleDateString("en-IN")} · {b.time} · {b.clinic}</div>
                        <div style={{ fontSize: 12, color: T.subtext }}>Contact: {b.contact}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexDirection: "column", alignItems: "flex-end" }}>
                        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: b.status === "Confirmed" ? "#EAF3DE" : b.status === "Completed" ? "#E6F1FB" : b.status === "Cancelled" ? "#FCEBEB" : "#FAEEDA", color: b.status === "Confirmed" ? "#3B6D11" : b.status === "Completed" ? "#0C447C" : b.status === "Cancelled" ? "#A32D2D" : "#854F0B", fontWeight: 500 }}>{b.status}</span>
                        <div style={{ display: "flex", gap: 4 }}>
                          {["Confirmed", "Completed", "Cancelled"].map(s => (
                            <button key={s} onClick={() => updateBookingStatus(b._id, s)} style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.tabInactive, color: T.text, fontSize: 11, cursor: "pointer" }}>{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {!dataLoading && adminTab === "users" && (
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Registered Parents ({adminUsers.length})</div>
              {adminUsers.length === 0 ? <div style={{ color: T.subtext, fontSize: 14 }}>No users yet</div> :
                adminUsers.map((u, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#0F6E56" }}>{u.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: T.subtext }}>{u.email} · {u.phone}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#EAF3DE", color: "#3B6D11", fontWeight: 500 }}>Parent</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, transition: "background 0.3s" }}>
      <Toast toasts={toasts} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif", color: T.text }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#1D9E75" }}>💉 VacciCare</div>
            <div style={{ fontSize: 13, color: T.subtext }}>Welcome, {currentUser?.name}! 👋</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["en", "hi", "mr"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid #ccc", background: lang === l ? "#185FA5" : T.tabInactive, color: lang === l ? "#fff" : T.tabTextInactive, cursor: "pointer", fontSize: 12 }}>
                {l === "en" ? "EN" : l === "hi" ? "हि" : "म"}
              </button>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid #ccc", background: darkMode ? "#1D9E75" : T.tabInactive, color: darkMode ? "#fff" : T.tabTextInactive, cursor: "pointer", fontSize: 12 }}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={handleLogout} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid #ddd", background: T.tabInactive, color: "#A32D2D", cursor: "pointer", fontSize: 12 }}>Logout</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          {children.length === 0 && <div style={{ fontSize: 13, color: T.subtext, padding: "6px 12px" }}>No children added yet</div>}
          {children.map((c, i) => (
            <div key={i} onClick={() => setActiveChild(i)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: `1px solid ${activeChild === i ? "#1D9E75" : T.border}`, background: activeChild === i ? "#E1F5EE" : T.tabInactive, cursor: "pointer", fontSize: 13, color: activeChild === i ? "#0F6E56" : T.tabTextInactive }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#9FE1CB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#085041" }}>{c.name[0]}</div>
              {c.name}
            </div>
          ))}
          <button onClick={() => setShowAddChild(true)} style={{ padding: "6px 12px", borderRadius: 20, border: `1px dashed ${T.border}`, background: "transparent", color: T.subtext, fontSize: 13, cursor: "pointer" }}>+ Add child</button>
        </div>

        {showAddChild && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
            <div style={{ background: T.card, borderRadius: 12, padding: "1.5rem", width: 320 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: T.text }}>Add Child Profile</div>
              <input placeholder="Child's name" value={newChild.name} onChange={e => setNewChild({ ...newChild, name: e.target.value })} style={inputStyle} />
              <input placeholder="Age (e.g. 6 months)" value={newChild.age} onChange={e => setNewChild({ ...newChild, age: e.target.value })} style={inputStyle} />
              <select value={newChild.blood} onChange={e => setNewChild({ ...newChild, blood: e.target.value })} style={inputStyle}>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(b => <option key={b}>{b}</option>)}
              </select>
              <button onClick={handleAddChild} style={btnStyle}>Add Profile</button>
              <button onClick={() => setShowAddChild(false)} style={{ ...btnStyle, background: T.tabInactive, color: T.text, marginTop: 6 }}>Cancel</button>
            </div>
          </div>
        )}

        {selectedVaccine && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
            <div style={{ background: T.card, borderRadius: 12, padding: "1.5rem", width: 340 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: T.text }}>{selectedVaccine.name}</div>
              <p style={{ fontSize: 13, color: T.subtext, marginBottom: 8 }}>{selectedVaccine.info}</p>
              <p style={{ fontSize: 13, color: "#854F0B", background: "#FAEEDA", padding: "6px 10px", borderRadius: 8, marginBottom: 12 }}>⚠️ Side effects: {selectedVaccine.side}</p>
              <button onClick={() => { setTab("booking"); setSelectedVaccine(null); }} style={btnStyle}>Book this vaccine</button>
              <button onClick={() => setSelectedVaccine(null)} style={{ ...btnStyle, background: T.tabInactive, color: T.text, marginTop: 6 }}>Close</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 6, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {[["dashboard", L.dashboard], ["schedule", L.schedule], ["booking", L.booking], ["clinics", L.findClinics], ["reminders", L.reminders], ["history", L.history], ["calculator", L.calculator], ["profile", L.profile]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${T.border}`, background: tab === id ? "#1D9E75" : T.tabInactive, color: tab === id ? "#fff" : T.tabTextInactive, fontSize: 13, cursor: "pointer" }}>{label}</button>
          ))}
        </div>

        {dataLoading && (
          <div style={{ textAlign: "center", padding: "3rem", color: T.subtext }}>
            <div style={{ width: 40, height: 40, border: `3px solid ${T.border}`, borderTop: "3px solid #1D9E75", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
            Loading your data...
          </div>
        )}

        {!dataLoading && tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: "1rem" }}>
              {[[userBookings.filter(b => b.status === "Confirmed").length, L.dueSoon, "#FAEEDA", "#854F0B"],
                [userBookings.filter(b => b.status === "Completed").length, L.completed, "#EAF3DE", "#3B6D11"],
                [userBookings.length, L.total, "#E6F1FB", "#0C447C"]].map(([n, l, bg, color], i) => (
                <div key={i} style={{ background: bg, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 600, color }}>{n}</div>
                  <div style={{ fontSize: 11, color, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 500 }}>{L.progress}</span>
                <span style={{ color: "#1D9E75", fontWeight: 500 }}>{pct}%</span>
              </div>
              <div style={{ background: T.border, borderRadius: 20, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#1D9E75", borderRadius: 20, transition: "width 0.4s" }} />
              </div>
              <div style={{ fontSize: 12, color: T.subtext, marginTop: 4 }}>{child.done} of {child.total} vaccines completed</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>{L.upcoming}</div>
              {userBookings.filter(b => b.status === "Confirmed").slice(0, 3).length === 0 ? (
                <div style={{ fontSize: 13, color: T.subtext }}>No upcoming bookings. Book a vaccine slot!</div>
              ) : userBookings.filter(b => b.status === "Confirmed").slice(0, 3).map((b, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{b.vaccine}</div>
                    <div style={{ fontSize: 12, color: T.subtext }}>Due: {b.date} · {b.clinic}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#FAEEDA", color: "#854F0B", fontWeight: 500 }}>Upcoming</span>
                    <button onClick={() => handleCancelBooking(b._id)} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, border: "1px solid #A32D2D", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
            {children.length > 0 && (
              <div style={cardStyle}>
                <div style={{ fontWeight: 500, marginBottom: 10 }}>Child Profile</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 18, color: "#0F6E56" }}>{child.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{child.name}</div>
                    <div style={{ fontSize: 13, color: T.subtext }}>Age: {child.age} · Blood: {child.blood}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!dataLoading && tab === "schedule" && (
          <div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
              {Object.keys(vaccineSchedule).map(a => (
                <button key={a} onClick={() => setAgeTab(a)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${T.border}`, background: ageTab === a ? "#1D9E75" : T.tabInactive, color: ageTab === a ? "#fff" : T.tabTextInactive, fontSize: 12, cursor: "pointer" }}>{a}</button>
              ))}
            </div>
            <div style={cardStyle}>
              {vaccineSchedule[ageTab].map((v, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < vaccineSchedule[ageTab].length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: T.subtext }}>{v.desc}</div>
                  </div>
                  <button onClick={() => setSelectedVaccine(v)} style={{ fontSize: 11, color: "#185FA5", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>info</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!dataLoading && tab === "booking" && (
          <div style={cardStyle}>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>{L.booking}</div>
            {bookingSuccess ? (
              <div style={{ background: "#EAF3DE", color: "#3B6D11", padding: "1rem", borderRadius: 10, fontSize: 14 }}>
                ✅ Booking confirmed for {booking.name}!<br />
                {booking.vaccine} on {booking.date} at {booking.time}.<br /><br />
                {emailSent && "📧 Confirmation email sent! "}
                {smsSent && "📱 SMS reminder sent!"}
                {!emailSent && !smsSent && "A reminder will be sent before your appointment."}
                <button onClick={() => { setBookingSuccess(false); setSmsSent(false); setEmailSent(false); setBooking({ name: "", age: "", vaccine: "", date: "", time: "", clinic: "", contact: "", notes: "" }); }} style={{ ...btnStyle, marginTop: 12 }}>Book another</button>
              </div>
            ) : (
              <>
                {[["text", L.childName, "name", "Child's name"], ["text", L.contact, "contact", "+91 XXXXX XXXXX"]].map(([type, label, key, ph]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} placeholder={ph} value={booking[key]} onChange={e => setBooking({ ...booking, [key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}
                <label style={labelStyle}>{L.ageGroup}</label>
                <select value={booking.age} onChange={e => setBooking({ ...booking, age: e.target.value })} style={inputStyle}>
                  <option value="">Select age group</option>
                  {Object.keys(vaccineSchedule).map(a => <option key={a}>{a}</option>)}
                </select>
                <label style={labelStyle}>{L.selectVaccine}</label>
                <select value={booking.vaccine} onChange={e => setBooking({ ...booking, vaccine: e.target.value })} style={inputStyle}>
                  <option value="">Select vaccine</option>
                  {Object.values(vaccineSchedule).flat().map((v, i) => <option key={i}>{v.name}</option>)}
                </select>
                <label style={labelStyle}>{L.date}</label>
                <input type="date" value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} style={inputStyle} />
                <label style={labelStyle}>{L.timeSlot}</label>
                <select value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })} style={inputStyle}>
                  <option value="">Select time</option>
                  {["9:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
                <label style={labelStyle}>{L.clinic}</label>
                <select value={booking.clinic} onChange={e => setBooking({ ...booking, clinic: e.target.value })} style={inputStyle}>
                  <option value="">Select clinic</option>
                  {clinicsData.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
                <label style={labelStyle}>{L.notes}</label>
                <textarea placeholder="Allergies, previous reactions..." value={booking.notes} onChange={e => setBooking({ ...booking, notes: e.target.value })} style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} />
                <button onClick={handleBook} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
                  {loading ? <><Spinner />{L.bookBtn}...</> : L.bookBtn}
                </button>
              </>
            )}
          </div>
        )}

        {!dataLoading && tab === "clinics" && (
          <div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Vaccination Clinics Near You</div>
              <input placeholder="Search by clinic name or area..." value={clinicSearch} onChange={e => setClinicSearch(e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} />
              {filteredClinics.length === 0 ? (
                <div style={{ fontSize: 13, color: T.subtext }}>No clinics found for "{clinicSearch}"</div>
              ) : filteredClinics.map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: T.tabInactive, borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: T.subtext }}>{c.area} · {c.dist} · {c.hours}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: statusBg[c.status] || "#EAF3DE", color: statusColor[c.status] || "#3B6D11", fontWeight: 500 }}>{c.status}</span>
                    {c.free && <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#EEEDFE", color: "#3C3489", fontWeight: 500 }}>Free</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!dataLoading && tab === "reminders" && (
          <div style={cardStyle}>
            <div style={{ fontWeight: 500, marginBottom: 12 }}>{L.reminders}</div>
            {[["r1", "24-hour reminder", "Alert a day before appointment"],
              ["r2", "1-hour reminder", "Quick reminder before heading out"],
              ["r3", "Monthly due alerts", "Vaccines due in the next month"],
              ["r4", "Overdue vaccine alerts", "Alert when a vaccine is missed"],
              ["r5", "SMS notifications", "Send reminders via SMS"],
              ["r6", "WhatsApp reminders", "Reminders via WhatsApp"]].map(([key, title, desc]) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
                  <div style={{ fontSize: 12, color: T.subtext }}>{desc}</div>
                </div>
                <div onClick={() => setReminders({ ...reminders, [key]: !reminders[key] })} style={{ width: 36, height: 20, borderRadius: 10, background: reminders[key] ? "#1D9E75" : "#ccc", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", width: 14, height: 14, background: "#fff", borderRadius: "50%", top: 3, left: reminders[key] ? 19 : 3, transition: "left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!dataLoading && tab === "history" && (
          <div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>{L.history}</div>
              {userBookings.length === 0 ? (
                <div style={{ fontSize: 13, color: T.subtext }}>No bookings yet. Book a vaccine to see history!</div>
              ) : userBookings.map((b, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < userBookings.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{b.vaccine}</div>
                      <div style={{ fontSize: 12, color: T.subtext }}>{b.date} · {b.clinic}</div>
                      <div style={{ fontSize: 12, color: T.subtext }}>Child: {b.childName}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: b.status === "Confirmed" ? "#EAF3DE" : b.status === "Completed" ? "#E6F1FB" : "#FCEBEB", color: b.status === "Confirmed" ? "#3B6D11" : b.status === "Completed" ? "#0C447C" : "#A32D2D", fontWeight: 500 }}>{b.status}</span>
                      {b.status === "Confirmed" && (
                        <button onClick={() => handleCancelBooking(b._id)} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, border: "1px solid #A32D2D", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer" }}>Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleExportPDF} style={{ ...btnStyle, background: T.tabInactive, color: T.text, border: `1px solid ${T.border}` }}>Export as PDF ↗</button>
          </div>
        )}

        {!dataLoading && tab === "calculator" && (
          <div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>💉 Vaccine Due Date Calculator</div>
              <p style={{ fontSize: 13, color: T.subtext, marginBottom: 12 }}>Enter your child's date of birth to see all vaccine due dates automatically.</p>
              <label style={labelStyle}>Child's Date of Birth</label>
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inputStyle} max={new Date().toISOString().split('T')[0]} />
            </div>
            {dob && (() => {
              const birthDate = new Date(dob);
              const today = new Date();
              const completedVaccines = userBookings.filter(b => b.status === "Completed").map(b => b.vaccine);
              const upcoming = vaccineCalendarData.filter(v => { const due = new Date(birthDate); due.setDate(due.getDate() + v.daysAfterBirth); return due > today && !completedVaccines.includes(v.name); }).length;
              const overdue = vaccineCalendarData.filter(v => { const due = new Date(birthDate); due.setDate(due.getDate() + v.daysAfterBirth); return due < today && !completedVaccines.includes(v.name); }).length;
              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: "1rem" }}>
                    {[[upcoming, "Upcoming", "#FAEEDA", "#854F0B"], [overdue, "Overdue", "#FCEBEB", "#A32D2D"], [completedVaccines.length, "Completed", "#EAF3DE", "#3B6D11"]].map(([n, l, bg, color], i) => (
                      <div key={i} style={{ background: bg, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                        <div style={{ fontSize: 26, fontWeight: 600, color }}>{n}</div>
                        <div style={{ fontSize: 11, color, marginTop: 2 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={cardStyle}>
                    <div style={{ fontWeight: 500, marginBottom: 12 }}>All Vaccine Due Dates</div>
                    {vaccineCalendarData.map((v, i) => {
                      const dueDate = new Date(birthDate);
                      dueDate.setDate(dueDate.getDate() + v.daysAfterBirth);
                      const isCompleted = completedVaccines.includes(v.name);
                      const isOverdue = dueDate < today && !isCompleted;
                      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < vaccineCalendarData.length - 1 ? `1px solid ${T.border}` : "none" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{v.name}</div>
                            <div style={{ fontSize: 12, color: T.subtext }}>
                              Due: {dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              {!isCompleted && daysLeft > 0 && daysLeft <= 30 && ` · In ${daysLeft} days`}
                              {isOverdue && ` · ${Math.abs(daysLeft)} days ago`}
                            </div>
                          </div>
                          <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, fontWeight: 500, background: isCompleted ? "#EAF3DE" : isOverdue ? "#FCEBEB" : daysLeft <= 30 ? "#FAEEDA" : T.tabInactive, color: isCompleted ? "#3B6D11" : isOverdue ? "#A32D2D" : daysLeft <= 30 ? "#854F0B" : T.subtext }}>
                            {isCompleted ? "✓ Done" : isOverdue ? "Overdue" : daysLeft <= 30 ? "Due Soon" : "Upcoming"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => setTab("booking")} style={btnStyle}>Book a Vaccine Slot →</button>
                </div>
              );
            })()}
          </div>
        )}

        {!dataLoading && tab === "profile" && (
          <div>
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontWeight: 500 }}>👤 Parent Profile</div>
                <button onClick={() => { setProfileEdit(!profileEdit); setProfileSaved(false); }} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "1px solid #1D9E75", background: profileEdit ? T.tabInactive : "#E1F5EE", color: profileEdit ? T.subtext : "#0F6E56", cursor: "pointer" }}>
                  {profileEdit ? "Cancel" : "Edit"}
                </button>
              </div>
              {profileSaved && <div style={{ background: "#EAF3DE", color: "#3B6D11", padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 12 }}>✅ Profile updated successfully!</div>}
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1D9E75", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {currentUser?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{currentUser?.name}</div>
                  <div style={{ fontSize: 13, color: T.subtext }}>{currentUser?.email}</div>
                  <div style={{ fontSize: 12, color: "#1D9E75", marginTop: 2, fontWeight: 500 }}>Parent Account</div>
                </div>
              </div>
              {profileEdit ? (
                <>
                  <label style={labelStyle}>Full Name</label>
                  <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} style={inputStyle} placeholder="Your full name" />
                  <label style={labelStyle}>Phone Number</label>
                  <input value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                  <label style={labelStyle}>Email (cannot be changed)</label>
                  <input value={profileForm.email} disabled style={{ ...inputStyle, opacity: 0.6 }} />
                  <button onClick={handleSaveProfile} style={btnStyle}>Save Changes</button>
                </>
              ) : (
                <div>
                  {[["Full Name", currentUser?.name], ["Email", currentUser?.email], ["Phone", currentUser?.phone || "Not set"]].map(([label, value], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                      <span style={{ fontSize: 13, color: T.subtext }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>📊 My Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[[userBookings.length, "Total Bookings", "#E6F1FB", "#0C447C"],
                  [userBookings.filter(b => b.status === "Confirmed").length, "Confirmed", "#EAF3DE", "#3B6D11"],
                  [userBookings.filter(b => b.status === "Cancelled").length, "Cancelled", "#FCEBEB", "#A32D2D"]].map(([n, l, bg, color], i) => (
                  <div key={i} style={{ background: bg, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color }}>{n}</div>
                    <div style={{ fontSize: 11, color, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 500 }}>👶 Children Profiles ({children.length})</div>
                <button onClick={() => setShowAddChild(true)} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "1px solid #1D9E75", background: "#E1F5EE", color: "#0F6E56", cursor: "pointer" }}>+ Add</button>
              </div>
              {children.length === 0 ? (
                <div style={{ fontSize: 13, color: T.subtext }}>No children added yet.</div>
              ) : children.map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < children.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#9FE1CB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#085041" }}>{c.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: T.subtext }}>Age: {c.age} · Blood: {c.blood}</div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteChild(c._id, c.name)} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, border: "1px solid #A32D2D", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer" }}>Remove</button>
                </div>
              ))}
            </div>
            <button onClick={handleLogout} style={{ ...btnStyle, background: "#FCEBEB", color: "#A32D2D", border: "1px solid #A32D2D" }}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}