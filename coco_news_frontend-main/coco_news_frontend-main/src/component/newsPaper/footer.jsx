import styles from "./styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; CocoNewz . All rights reserved.</p>
      <nav>
        <a href="#">About Us</a> | <a href="#">Contact</a> | <a href="#">Advertise</a> | <a href="#">Subscribe</a>
      </nav>
    </footer>
  )
}

export default Footer

