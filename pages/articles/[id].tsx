import { useRouter } from "next/router"
import { useState } from "react";

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

        return <button className={"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-1 text-center ml-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={addWordHandler}>&rarr;</button>
    }

    return <div className={"flex h-screen flex-col"}>
            <div className={"p-3"}>
                <div><h1 className={"text-5xl font-normal leading-normal mt-0 mb-2"}>Article {id}</h1></div>
                <div onMouseUp={selectionListener} className={""}>{article.content}</div>
            </div>
            <div className={"p-3"}>
                <h3 className={"text-3xl font-normal leading-normal mt-0 mb-2"}>Selected text: {selectedText} {getAddWordButtton()}</h3>
                <h4 className={"text-2xl font-normal leading-normal mt-0 mb-2"}>Keywords:{keyWords.map(kw => ` ${kw},`)}</h4>
            </div>
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