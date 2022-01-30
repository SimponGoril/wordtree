import Link from 'next/link'
import styles from '../../styles/Article.module.css'

export default function Articles() {
    return <div className={styles.article}>
            <h1>Articles:</h1>
            <Link href={'articles/1'}>
                <a className={styles.articleLink}>&rarr; First Article</a>
            </Link>
        </div>
}