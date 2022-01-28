import { useRouter } from "next/router"
import { useState } from "react";
import styles from '../../styles/Article.module.css'

interface ArticleProps {
    article: any
}

export default function Article<Article>({ article }: ArticleProps) {
    const router = useRouter()
    const {id} = router.query

    const [selectedText, setSelectedText] = useState<string>();

    const selectionListener = () => {
        setSelectedText(window.getSelection()?.toString())
    }

    return <div className={styles.article}>
        <h1>helloo {id}</h1>
        <div onMouseUp={selectionListener} className={styles.content}>{article.content}</div>

        <h3 >Selected text: {selectedText}</h3>
        </div>
}

export async function getStaticProps<Promise>({ params }: any) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json()

    return {
        props: {article: data}
    }
}

export async function getStaticPaths() {
    const req = await fetch(`http://localhost:3000/articles.json`)
    const data = await req.json() as any[]

    const paths = data.map(article => {
        return { params: {id: article}}
    })

    return {
        paths,
        fallback: false
    }
}