import MainArticle from "../components/MainArticle"
import SideArticles from "../components/SideArticles"
import Weather from "../components/Weather"
import StockTicker from "../components/StockTicker"
import Opinion from "../components/Opinion"
import Sports from "../components/Sports"
import "./styles/pages.css"

const HomePage = () => {
  return (
    <div className="pages">
      <div className="main-content">
        <MainArticle />
        <Opinion />
        <Sports />
      </div>
      <aside className="sidebar">
        <SideArticles />
        <Weather />
        <StockTicker />
      </aside>
    </div>
  )
}

export default HomePage

