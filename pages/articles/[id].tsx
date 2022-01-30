import { useRouter } from "next/router"
import { useState } from "react";
import styles from '../../styles/Article.module.css'

interface ArticleProps {
    article: any
}

export default function Article<Article>({ article }: ArticleProps) {
    const router = useRouter()
    const {id} = router.query

    const [selectedText, setSelectedText] = useState<string>()
    const [keyWords, setKeyWords] = useState<string[]>([])

    const selectionListener = () => {
        setSelectedText(window.getSelection()?.toString())
    }

    const addWordHandler = () => {
        if (!selectedText || keyWords.some(kw => kw === selectedText)) return
        setKeyWords([...keyWords, selectedText])
    }

    const getAddWordButtton = () => {
        if (!selectedText) return

        return <button className={styles.addWordButton} onClick={addWordHandler}>&rarr;</button>
    }

    return <div className={styles.article}>
        <h1>Article {id}</h1>
        <div onMouseUp={selectionListener} className={styles.content}>{article.content}</div>

        <h3 >Selected text: {selectedText} {getAddWordButtton()}</h3>

        <h4>Keywords:{keyWords.map(kw => ` ${kw},`)}</h4>
        </div>
}

export async function getStaticProps<Promise>({ params }: any) {
    // const req = await fetch(`http://localhost:3000/${params.id}.json`)
    // const data = await req.json()

    const data = {
        "id": 1,
        "description": "some description",
        "content": "Some religions describe God without reference to gender, while others use terminology that is gender-specific and gender-biased. God has been conceived as either personal or impersonal. In theism, God is the creator and sustainer of the universe, while in deism, God is the creator, but not the sustainer, of the universe. In pantheism, God is the universe itself. Atheism is an absence of belief in any God or deity, while agnosticism deems the existence of God unknown or unknowable. God has also been conceived as the source of all moral obligation, and the 'greatest conceivable existent'. Many notable philosophers have developed arguments for and against the existence of God."
    }

    return {
        props: {article: data}
    }
}

export async function getStaticPaths() {
    // const req = await fetch(`http://localhost:3000/articles.json`)
    // const data = await req.json() as any[]

    const data = ["1"]

    const paths = data.map(article => {
        return { params: {id: article}}
    })

    return {
        paths,
        fallback: false
    }
}