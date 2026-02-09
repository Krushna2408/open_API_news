import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../newsPaper/header"
import Footer from "../newsPaper/footer"
import styles from "./styles/opinionPage.module.css"

const Opinion = () => {
  const [publishedNews, setPublishedNews] = useState([])
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userRole, setUserRole] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    fetchPublishedNews()
    fetchBookmarkedNews()
    getUserRole()
  }, [])
  const API_KEY = process.env.REACT_APP_API_URL

  const fetchPublishedNews = async () => {
    try {
      const response = await axios.get(`${API_KEY}/news/published`)
      setPublishedNews(response.data)
    } catch (error) {
      setError("Failed to fetch published news. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchBookmarkedNews = async () => {
    try {
      const token = sessionStorage.getItem("authToken")
      const response = await axios.get(`${API_KEY}/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const bookmarkedIds = new Set(response.data.map((news) => news.id))
      setBookmarkedNews(bookmarkedIds)
    } catch (error) {
      console.error("❌ Error fetching bookmarks:", error.response?.data || error.message)
    }
  }

  const handleDelete = async (newsId) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return

    try {
      const token = sessionStorage.getItem("authToken")

      await axios.delete(`${API_KEY}/news/${newsId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setPublishedNews((prevNews) => prevNews.filter((news) => news.id !== newsId))

      alert("🗑️ News deleted successfully!")
    } catch (error) {
      console.error("❌ Error deleting news:", error.response?.data || error.message)
      alert("⚠️ Failed to delete news. Please try again.")
    }
  }

  const getUserRole = () => {
    const role = sessionStorage.getItem("userRole")
    if (role) {
      setUserRole(role)
    }
  }

  const handleBookmark = async (newsId) => {
    const token = sessionStorage.getItem("authToken")

    try {
      await axios.post(`${API_KEY}/bookmarks`, { news_id: newsId }, { headers: { Authorization: `Bearer ${token}` } })

      setBookmarkedNews((prev) => new Set(prev).add(newsId))

      alert("✅ News bookmarked successfully!")
    } catch (error) {
      console.error("❌ Error bookmarking news:", error.response?.data || error.message)
      alert("⚠️ Failed to bookmark news. Please try again.")
    }
  }

  return (
    <>
      <Navbar />

      <button onClick={() => navigate("/bookmarks")} className={styles.bookmarkButton} title="View Bookmarked News">
        <svg className={styles.bookmarkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </button>

      <main className={styles.opinionPage}>
        <h2 className={styles.sectionTitle}>Opinion</h2>

        {loading && <p>Loading published news...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && publishedNews.length === 0 && <p>No published news available.</p>}

        {publishedNews.map((news) => (
          <article key={news.id} className={styles.newsArticle}>
            <h3 className={styles.articleTitle}>{news.title}</h3>
            <p className={styles.articleMeta}>
              <strong>By {news.source}</strong>
            </p>
            <p className={styles.articleContent}>{news.content}</p>

            <div className={styles.articleActions}>
              {userRole === "admin" && (
                <button
                  onClick={() => handleDelete(news.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  🗑️ Delete
                </button>
              )}

              <button
                onClick={() => handleBookmark(news.id)}
                disabled={bookmarkedNews.has(news.id)}
                className={`${styles.actionButton} ${styles.bookmarkArticleButton}`}
              >
                {bookmarkedNews.has(news.id) ? "✔️ Bookmarked" : "🔖 Bookmark"}
              </button>
            </div>
          </article>
        ))}
      </main>

      <Footer />
    </>
  )
}

export default Opinion

