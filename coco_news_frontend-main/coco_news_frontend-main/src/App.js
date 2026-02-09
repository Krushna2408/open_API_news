import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./component/auth/signUp";
import Signin from "./component/auth/signIn";
import ForgotPassword from "./component/auth/forgotpassword";
import Homepage from "./component/newsPaper/newsPaper";
import PoliticsPage from "./component/pages/politicsPage";
import BusinessPage from "./component/pages/businessPage";
import TechnologyPage from "./component/pages/technologyPage";
import SportsPage from "./component/pages/sportsPage";
import EntertainmentPage from "./component/pages/entertainmentPage";
import Opinion from "./component/pages/opinionPage";
import Bookmarks from "./component/pages/bookmarkedNews";
import AddNews from "./component/pages/createNews";
import AdminDashboard from "./component/pages/adminDashboard";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

function App() {
  const isAuthenticated = sessionStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route - Everyone can see the homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/politics" element={<PoliticsPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/opinion" element={<Opinion />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        {/* Protected Routes - Require Login */}
        <Route path="/createNews" element={<PrivateRoute><AddNews /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/homepage" element={<Homepage />} /> {/* Already public */}

        {/* 404 Page */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
