import { useEffect, useState } from "react"
import axios from "axios"
import Header from "../newsPaper/header"
import Footer from "../newsPaper/footer"
import "./styles/adminDashboard.css"

const AdminDashboard = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const API_KEY = process.env.REACT_APP_API_URL

  const fetchNews = async () => {
    try {
      setLoading(true)
      const token = sessionStorage.getItem("authToken")

      if (!token) {
        console.error("❌ No token found. User is not authenticated.")
        return
      }

      const response = await axios.get(`${API_KEY}/news/drafts`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("🟢 API Response:", response.data)
      setNews(response.data)
    } catch (error) {
      console.error("❌ Error fetching draft news:", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (newsId) => {
    try {
      const token = sessionStorage.getItem("authToken")
      await axios.post(`${API_KEY}/news/publish`, { newsId }, { headers: { Authorization: `Bearer ${token}` } })

      alert("✅ News published successfully!")
      setNews((prevNews) => prevNews.filter((item) => item.id !== newsId))
    } catch (error) {
      console.error("❌ Error publishing news:", error.response?.data || error.message)
    }
  }

  const handleDelete = async (newsId) => {
    try {
      const token = sessionStorage.getItem("authToken")
      await axios.delete(`${API_KEY}/news/${newsId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert("🗑️ News draft deleted successfully!")
      setNews((prevNews) => prevNews.filter((item) => item.id !== newsId))
    } catch (error) {
      console.error("❌ Error deleting news:", error.response?.data || error.message)
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="container">
        <div className="main-content admin-dashboard">
          <h2>Admin Dashboard</h2>

          {loading ? <p>Loading drafts...</p> : null}

          {news.length === 0 && !loading ? <p>No draft news available.</p> : null}

          {news.map((item) => (
            <div key={item.id} className="draft-article">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <button onClick={() => handlePublish(item.id)} className="publish-button">
                Publish
              </button>
              <button onClick={() => handleDelete(item.id)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AdminDashboard

