"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../newsPaper/header"
import Footer from "../newsPaper/footer"
import "./styles/bookmarkedNews.css"

const BookmarkedNews = () => {
  const [bookmarkedNews, setBookmarkedNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBookmarkedNews()
  }, [])
  const API_KEY = process.env.REACT_APP_API_URL

  const fetchBookmarkedNews = async () => {
    try {
      const token = sessionStorage.getItem("authToken")
      const response = await axios.get(`${API_KEY}/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setBookmarkedNews(response.data)
    } catch (error) {
      setError("Failed to fetch bookmarked news. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="bookmarked-news">
        <h2>Bookmarked News</h2>

        {loading && <p>Loading bookmarks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && bookmarkedNews.length === 0 && <p>No bookmarked news available.</p>}

        {bookmarkedNews.map((news) => (
          <article key={news.id}>
            <h3>{news.title}</h3>
            <p>
              <strong>By {news.source}</strong>
            </p>
            <p>{news.content}</p>
          </article>
        ))}
      </section>
      <Footer />
    </>
  )
}

export default BookmarkedNews

