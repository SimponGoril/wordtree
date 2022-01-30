import styles from '../../styles/Article.module.css'

export default function Articles() {
    return <div className={styles.article}>
            <h1>Articles:</h1>
            <a className={styles.articleLink} href={'articles/1'}>&rarr; First Article</a>
        </div>
}