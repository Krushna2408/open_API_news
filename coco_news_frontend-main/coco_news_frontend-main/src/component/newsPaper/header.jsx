import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Weather from "./weather"
import Categories from "./categories"
import Logo from "../../assets/images/coco-logo.png"
import styles from "./styles/Header.module.css"

const Header = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("authToken"))
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole"))

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!sessionStorage.getItem("authToken"))
      setUserRole(sessionStorage.getItem("userRole"))
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("authToken")
    sessionStorage.removeItem("userRole")
    setIsAuthenticated(false)
    navigate("/signin")
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      {/* Logo */}
      <img src={Logo || "/placeholder.svg"} alt="CocoNwez Logo" className={styles.logo} onClick={() => navigate("/")} />

      {/* Categories Below Header */}
      

      {/* Right Section: Weather & Profile/Login */}
      <div className={styles.rightSection}>
        <div className={styles.weatherNav}>
          <Weather />
        </div>

        {/* Profile / Login Button */}
        <nav>
          {isAuthenticated ? (
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>Profile ▼</button>
              <div className={styles.dropdownContent}>
                <Link to="/profile">Profile</Link>
                {userRole === "admin" && <Link to="/admin">Admin Panel</Link>}
                {["admin", "author"].includes(userRole) && <Link to="/createNews">Create News</Link>}
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/signin" className={styles.loginBtn}>
              Login
            </Link>
          )}
          
        </nav>
      </div>
        <Categories />
    </header>
  )
}

export default Header

