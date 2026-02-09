"use client"

import { useEffect, useState } from "react"
import Navbar from "../newsPaper/header"
import Footer from "../newsPaper/footer"
import styles from "./styles/PoliticsPage.module.css"

const BusinessPage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY
  const API_URL = `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${API_KEY}`

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        if (data.articles) {
          setArticles(data.articles.slice(0, 5)) // Limit to 5 articles
        }
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [API_URL]) // Added API_URL to dependencies

  return (
    <div>
      <Navbar />
      <main className={styles.politicsPage}>
        <h2 className={styles.sectionTitle}>Business News</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          articles.map((article, index) => (
            <article key={index} className={styles.newsArticle}>
              {article.urlToImage && (
                <img src={article.urlToImage || "/placeholder.svg"} alt={article.title} className={styles.newsImage} />
              )}
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description || "No description available."}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                Read more
              </a>
            </article>
          ))
        )}
      </main>
      <Footer />
    </div>
  )
}

export default BusinessPage

