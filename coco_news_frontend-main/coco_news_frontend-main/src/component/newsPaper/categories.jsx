import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./styles/Categories.module.css"

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const categories = [
    { name: "Home", path: "/" },
    { name: "Politics", path: "/politics" },
    { name: "Business", path: "/business" },
    { name: "Technology", path: "/technology" },
    { name: "Sports", path: "/sports" },
    { name: "Entertainment", path: "/entertainment" },
    { name: "Opinion", path: "/opinion" },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <nav className={styles.categories}>
      <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Menu" : "Menu"}
      </button>
      <div className={`${styles.categoryList} ${isOpen ? styles.open : ""}`}>
        {categories.map((category, index) => {
          const isActive = location.pathname === category.path || (category.path === "/" && location.pathname === "/")

          return (
            <span
              key={index}
              className={`${styles.category} ${isActive ? styles.active : ""}`}
              onClick={() => handleNavigation(category.path)}
            >
              {category.name}
            </span>
          )
        })}
      </div>
    </nav>
  )
}

export default Categories

