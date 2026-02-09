import styles from "./styles/Opinion.module.css"

const Opinion = () => {
  return (
    <section className={styles.opinion}>
      <h2 className={styles.sectionTitle}>Opinion</h2>
      <article>
        <h3>The Future of Artificial Intelligence</h3>
        <p>By John Doe, Tech Analyst</p>
        <p>
          As AI continues to evolve, we must consider its implications on society, ethics, and the job market. While it
          promises great advancements, we must also be cautious of potential pitfalls...
        </p>
        <a href="#" className={styles.readMore}>
          Read more
        </a>
      </article>
    </section>
  )
}

export default Opinion

