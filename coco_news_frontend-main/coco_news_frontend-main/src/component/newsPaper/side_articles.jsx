"use client"

import { useEffect, useState } from "react"
import styles from "./styles/Newspaper.module.css"

const SideArticles = () => {
  const [articles, setArticles] = useState([])
  const apiKey = process.env.REACT_APP_NEWS_API_KEY

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
        )
        const data = await response.json()

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 6))
        } else {
          console.error("No news articles found.")
        }
      } catch (error) {
        console.error("Error fetching news:", error)
      }
    }

    fetchNews()
  }, [apiKey])

  if (articles.length === 0) return <p>Loading side articles...</p>

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className={styles.sideArticle}>
          <img src={article.urlToImage || "/placeholder.svg?height=120&width=200"} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description || "No description available."}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </>
  )
}

export default SideArticles

