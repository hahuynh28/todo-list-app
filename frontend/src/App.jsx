import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      {/* Global toast notifications */}
      <Toaster position="top-right" richColors />

      {/* Application routing */}
      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <HomePage />
              // </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
