import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../newsPaper/header"
import Footer from "../newsPaper/footer"
import "./styles/createNews.css"

const AddNews = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    // ✅ Fetch user role from sessionStorage
    const role = sessionStorage.getItem("userRole")
    if (role) {
      setUserRole(role)
    }
  }, [])

  const API_KEY = process.env.REACT_APP_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = sessionStorage.getItem("authToken")

    if (!token) {
      setMessage("❌ No token found. Please log in again.")
      return
    }

    // ✅ Restrict access to only admins and authors
    if (userRole !== "admin" && userRole !== "author") {
      setMessage("⚠️ Only admins and authors can add news.")
      return
    }

    try {
      const response = await axios.post(
        `${API_KEY}/news/add`,
        { title, content, category, source: "manual" },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setMessage("✅ " + response.data.message)
      setTitle("")
      setContent("")
      setCategory("")
    } catch (error) {
      setMessage("❌ Error adding news. Please try again.")
    }
  }

  return (
    <>
      <Navbar/>
    <div className="create-news">
      <h2>Add News (Admins & Authors Only)</h2>
      {message && <p>{message}</p>}

      {userRole === "admin" || userRole === "author" ? (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p style={{ color: "red" }}>⚠️ You are not authorized to add news.</p>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default AddNews

