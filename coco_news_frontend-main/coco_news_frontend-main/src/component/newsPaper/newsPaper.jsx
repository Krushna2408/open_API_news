import { Link } from "react-router-dom"
import Header from "./header"
import MainArticle from "./mainArticle"
import SideArticles from "./side_articles"
import StockTicker from "./stockTicker"
import Opinion from "./opinion"
import Politics from "./politics"
import Entertainment from "./entertainment"
import Conference from "./conference"
import Sports from "./sports"
import Footer from "./footer"
import styles from "./styles/Newspaper.module.css"

const Newspaper = () => {
  const isAuthenticated = sessionStorage.getItem("authToken")

  return (
    <div className={styles.newspaper}>
      <Header />
      <div className={styles.mainContent}>
        <MainArticle />
        <div className={styles.sideContent}>
          <SideArticles />
        </div>
      </div>
      <StockTicker />
      <Sports />
      <Opinion />
      <Politics />
      <Entertainment />
      <Conference />
      <Footer />

      {!isAuthenticated && (
        <div className={styles.loginPrompt}>
          <p>
            Want to access more features? <Link to="/signin">Log in here</Link>.
          </p>
        </div>
      )}
    </div>
  )
}

export default Newspaper

