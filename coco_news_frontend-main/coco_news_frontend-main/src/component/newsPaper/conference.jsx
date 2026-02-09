import styles from "./styles/Conference.module.css"

const Conference = () => {
  return (
    <section className={styles.conference}>
      <h2 className={styles.sectionTitle}>Conference Highlights</h2>
      <article>
        <h3>Tech Innovation Summit 2023</h3>
        <p>
          The annual Tech Innovation Summit brought together industry leaders and visionaries to discuss the future of
          technology. Key topics included sustainable tech, AI ethics, and the next generation of mobile devices...
        </p>
        <a href="#" className={styles.readMore}>
          Read more
        </a>
      </article>
    </section>
  )
}

export default Conference

