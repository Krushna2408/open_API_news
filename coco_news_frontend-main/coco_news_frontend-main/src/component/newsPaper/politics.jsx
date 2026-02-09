import styles from "./styles/Politics.module.css"

const Politics = () => {
  return (
    <section className={styles.politics}>
      <h2 className={styles.sectionTitle}>Politics</h2>
      <article>
        <h3>New Bill Passes in Senate</h3>
        <p>
          In a landmark decision, the Senate has passed a new bill addressing climate change. The bill, which has been
          in debate for months, aims to reduce carbon emissions by 50% over the next decade...
        </p>
        <a href="#" className={styles.readMore}>
          Read more
        </a>
      </article>
    </section>
  )
}

export default Politics

