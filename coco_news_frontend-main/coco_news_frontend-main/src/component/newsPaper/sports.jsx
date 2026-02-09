import { useEffect, useState } from "react"
import styles from "./styles/Sports.module.css"

const Sports = () => {
  const [articles, setArticles] = useState([])
  const apiKey = process.env.REACT_APP_NEWS_API_KEY

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`)
        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 4))
        } else {
          console.error("No sports news found.")
        }
      } catch (error) {
        console.error("Error fetching sports news:", error)
      }
    }

    fetchSportsNews()
  }, [apiKey])

  if (articles.length === 0) return <p>Loading sports news...</p>

  return (
    <section className={styles.sports}>
      <h2>Sports</h2>
      {articles.map((article, index) => (
        <article key={index}>
          <h3>{article.title}</h3>
          <p>{article.description || "No description available."}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </article>
      ))}
    </section>
  )
}

export default Sports

