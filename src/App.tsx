import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./core/auth.store";
import { Login } from "./pages/Login";
import { ChangePassword } from "./pages/ChangePassword";
import { Register } from "./pages/Register";
import { Pricing } from "./pages/Pricing";
import { AdminConsole } from "./pages/AdminConsole";
import { UniversalModule } from "./system/UniversalModule";
import { Shell } from "./layout/Shell";
import { POSDashboard } from "./modules/pos/POSDashboard";
import { ParkingDashboard } from "./modules/parking/ParkingDashboard";
import { LoansDashboard } from "./modules/loans/LoansDashboard";
import { ExchangeDashboard } from "./modules/exchange/ExchangeDashboard";
import { AnimalLawDashboard } from "./modules/animal-law/AnimalLawDashboard";
import { Landing } from "./landings/Landing";
import { CommandBar } from "./system/CommandBar";
import { NotificationCenter } from "./system/NotificationCenter";
import { ChatbotIA } from "./system/ChatbotIA";
import { ToastHost } from "./system/ToastHost";

function GlobalSystems() {
  return (
    <>
      <CommandBar />
      <NotificationCenter />
      <ChatbotIA />
      <ToastHost />
    </>
  );
}

export default function App() {
  const { user, mustChangePassword } = useAuth();
  return (
    <BrowserRouter>
      <GlobalSystems />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:slug" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to="/app" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/app" /> : <Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/change-password" element={user ? <ChangePassword /> : <Navigate to="/login" />} />
        <Route path="/app" element={user ? (mustChangePassword ? <Navigate to="/change-password" /> : <Shell />) : <Navigate to="/login" />}>
          <Route index element={<POSDashboard />} />
          <Route path="pos" element={<POSDashboard />} />
          <Route path="parking" element={<ParkingDashboard />} />
          <Route path="loans" element={<LoansDashboard />} />
          <Route path="exchange" element={<ExchangeDashboard />} />
          <Route path="animal-law" element={<AnimalLawDashboard />} />
          <Route path="system/:slug" element={<UniversalModule />} />
        </Route>
        <Route path="/admin/login" element={<Login admin />} />
        <Route path="/admin" element={user && ["SUPER_ADMIN", "ADMIN"].includes(user.role) ? <AdminConsole /> : <Navigate to="/admin/login" />} />
      </Routes>
    </BrowserRouter>
  );
}