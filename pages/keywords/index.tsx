import Link from 'next/link'
import { useState } from 'react'
import styles from '../../styles/Article.module.css'

export default function KeyWords() {

    type Keyword = {
        id: number,
        title: string
    }    
    
    type RelationshipType = {
        id: number,
        name: string
    }

    type Relationship = {
        id: number,
        fromId: number,
        toId: number,
        typeId: number
    }

    const [keywords, setKeywords] = useState<Keyword[]>([
        {id: 1, title: 'God'},
        {id: 2, title: 'Universe'},
        {id: 3, title: 'Man'},
        {id: 4, title: 'Creation'},
        {id: 5, title: 'Jesus'},
    ])
    const [relationshipTypes, setRelationshipTypes] = useState<RelationshipType[]>([
        {id: 1, name: "Child of"},
        {id: 2, name: "Parent of"}
    ])
    const [relationships, setRelationships] = useState<Relationship[]>([])
    const [newKeyword, setNewKeyword] = useState<string>("")
    const [selectedRelationshipType, setSelectedRelationshipType] = useState<RelationshipType | undefined>(relationshipTypes[0])
    const [newRelationshipType, setNewRelationshipType] = useState<string>("")
    const [keywordFrom, setKeywordFrom] = useState<Keyword | undefined>()
    const [keywordTo, setKeywordTo] = useState<Keyword | undefined>()

    const isKeywordSelected = (kw: Keyword) => {
        if (keywordFrom && kw.id === keywordFrom.id) return true
        if (keywordTo && kw.id === keywordTo.id) return true
        return false
    }

    const getKeywords = () => {
        return <ol>{keywords.map(kw => { return <li onClick={() => keywordClickHandler(kw) }key={kw.id}>
            <span className={isKeywordSelected(kw) ? styles.selectedKeyword : "" }>{kw.title}</span></li>})}</ol>      
    }

    const getRelationshipTypes = () => {
        return <ol>{relationshipTypes.map(r => { return <li key={r.id}><span>{r.name}</span></li>})}</ol>      
    }    
    
    const getRelationships = () => {
        const getRelationshipNameString = (r: Relationship)=> {
            const findKw = (id: number) => {
                return keywords.find(kw => kw.id === id)
            }

            const fromKw = findKw(r.fromId)
            const toKw = findKw(r.toId)
            const type = relationshipTypes.find(rt => rt.id === r.typeId)

            return `${fromKw?.title} is ${type?.name} ${toKw?.title}`
        }
        return <ol>{relationships.map(r => { return <li key={r.id}>
            <span>{getRelationshipNameString(r)} <button className={styles.removeButton} onClick={() => removeRelationshipHandler(r)}>x</button></span>
            </li>})}</ol>      
    }

    const getRelationshipSelector = () => {
        if (!keywordFrom || !keywordTo) return 
        return <select onChange={e => setSelectedRelationshipType(relationshipTypes.find(rt => rt.id === Number(e.target.value)))}>
            {relationshipTypes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
    }

    const addKeywordHandler = () => {
        if (!newKeyword) return
        setKeywords([...keywords, {id: keywords.length + 1, title: newKeyword}])
        setNewKeyword("")
    }

    const addRelationshipTypeHandler = () => {
        if (!newRelationshipType) return
        setRelationshipTypes([...relationshipTypes, {id: relationshipTypes.length + 1, name: newRelationshipType}])
        setNewRelationshipType("")
    }    
    
    const addRelationshipHandler = () => {
        if (!keywordFrom || !keywordTo || !selectedRelationshipType) return
        setKeywordFrom(undefined)
        setKeywordTo(undefined)
        setRelationships([...relationships, {
            id: relationships.length + 1 , fromId: keywordFrom.id, toId: keywordTo.id, typeId: selectedRelationshipType.id
        }])
    }    
    
    const removeRelationshipHandler = (relationship: Relationship) => {
        if (!keywordFrom || !keywordTo || !selectedRelationshipType) return
        setRelationships([...relationships.filter(r => r.id !== relationship.id), ])
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
            <div>
                <div className={styles.leftColumn}>
                    <h1>Keywords </h1>
                    <input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="Type in new Keyword" type={"text"}/>
                    <button className={styles.addButton} onClick={addKeywordHandler}>&rarr;</button>
                    {getKeywords()}
                </div>
                <div className={styles.rightColumn}>
                    <h1>Relationship Types</h1>
                    <input value={newRelationshipType} onChange={e => setNewRelationshipType(e.target.value)} placeholder="Type in new Relationship Type" type={"text"}/>
                    <button className={styles.addButton} onClick={addRelationshipTypeHandler}>&rarr;</button>
                    {getRelationshipTypes()}
                </div>
            </div>
            <div>
                <h1>Relationships</h1>
                From {keywordFrom ? keywordFrom.title : "???"} to {keywordTo ? keywordTo.title: "???"} is {getRelationshipSelector()} <button className={styles.addButton} onClick={addRelationshipHandler}>&rarr;</button>
                {getRelationships()}
            </div>
        </div>
}