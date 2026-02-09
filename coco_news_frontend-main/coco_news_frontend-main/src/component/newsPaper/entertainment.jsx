import styles from "./styles/Entertainment.module.css"

const Entertainment = () => {
  return (
    <section className={styles.entertainment}>
      <h2 className={styles.sectionTitle}>Entertainment</h2>
      <article>
        <h3>Summer Blockbuster Breaks Box Office Records</h3>
        <p>
          The latest superhero movie has shattered box office records, grossing over $1 billion worldwide in just two
          weeks. Critics and fans alike are praising the film's groundbreaking special effects and compelling
          storyline...
        </p>
        <a href="#" className={styles.readMore}>
          Read more
        </a>
      </article>
    </section>
  )
}

export default Entertainment

