import Link from 'next/link'
import { useState } from 'react'
import styles from '../../styles/Article.module.css'

export default function KeyWords() {

    type Keyword = {
        id: number,
        title: string
    }

    const [keywords, setKeywords] = useState<Keyword[]>([
        {id: 1, title: 'God'},
        {id: 2, title: 'Universe'},
        {id: 3, title: 'Man'},
        {id: 4, title: 'Creation'},
        {id: 5, title: 'Jesus'},
    ])
    const [newKeyword, setNewKeyword] = useState<string>("")
    const [keywordFrom, setKeywordFrom] = useState<Keyword | undefined>()
    const [keywordTo, setKeywordTo] = useState<Keyword | undefined>()

    const relationshipType = [
        {id: 1, name: "Child of"},
        {id: 2, name: "Parent of"}
    ]

    const isKeywordSelected = (kw: Keyword) => {
        if (keywordFrom && kw.id === keywordFrom.id) return true
        if (keywordTo && kw.id === keywordTo.id) return true
        return false
    }

    const getKeywords = () => {
        return <ol>{keywords.map(kw => { return <li onClick={() => keywordClickHandler(kw) }key={kw.id}>
            <span className={isKeywordSelected(kw) ? styles.selectedKeyword : "" }>{kw.title}</span></li>})}</ol>      
    }

    const getRelationshipSelector = () => {
        if (!keywordFrom || !keywordTo) return 
        return <select>
            {relationshipType.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
    }

    const addKeywordHandler = () => {
        setKeywords([...keywords, {id: 666, title: newKeyword}])
        setNewKeyword("")
    }

    const keywordClickHandler = (kw: Keyword) => {
        if (!keywordFrom) {
            setKeywordFrom(kw)
        } else if (!keywordTo) {
            setKeywordTo(kw)
        } else {
            setKeywordFrom(undefined)
            setKeywordTo(undefined)
        }
    }

    return <div className={styles.article}>
            <h1>Keywords </h1>
            <input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="Type in new Keyword" type={"text"}/>
            <button className={styles.addWordButton} onClick={addKeywordHandler}>&rarr;</button>
            {getKeywords()}
            <hr/>
            <h1>Relationships</h1>
            From {keywordFrom ? keywordFrom.title : "???"} to {keywordTo ? keywordTo.title: "???"} is {getRelationshipSelector()}
            {}
        </div>
}