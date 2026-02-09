import { useEffect, useState } from "react"
import styles from "./styles/MainArticle.module.css"

const MainArticle = ({ userRole }) => {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState("")

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

        const data = await response.json()
        console.log("API Response:", data)

        if (data.articles && data.articles.length > 0) {
          setArticle(data.articles[0])
        } else {
          setArticle(null)
        }
      } catch (error) {
        console.error("Error fetching news:", error)
        setError("Failed to load news.")
      }
    }

    fetchNews()
  }, [API_KEY])

  const handleDelete = async () => {
    if (!article) return

    try {
      const response = await fetch(`http://localhost:5000/news/${article.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        setArticle(null)
        alert("News deleted successfully!")
      } else {
        alert("Failed to delete news.")
      }
    } catch (error) {
      console.error("Error deleting news:", error)
    }
  }

  if (error) return <p>Error: {error}</p>
  if (!article) return null

  return (
    <article className={styles.mainArticle}>
      <span className={styles.newsTitle}>Breaking News</span>
      <h2>{article.title}</h2>
      {article.urlToImage && <img src={article.urlToImage || "/placeholder.svg"} alt={article.title} />}
      <p>{article.description || "No description available."}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>

      {userRole === "admin" && (
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete
        </button>
      )}
    </article>
  )
}

export default MainArticle

