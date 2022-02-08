import { useState } from 'react'
import NetworkGraph from '../../components/networkGraph'

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
        if (kw.id === keywordFrom?.id) return true
        if (kw.id === keywordTo?.id) return true
        return false
    }    
    
    const isRelationshopSelected = (r: RelationshipType) => {
        if (selectedRelationshipType?.id === r.id) return true
        return false
    }

    const getKeywords = () => {
        return <ol className={"list-disc pl-6 pt-2"}>{keywords.map(kw => { return <li onClick={() => keywordClickHandler(kw) }key={kw.id}>
            <span className={isKeywordSelected(kw) ? "bg-orange-500" : "" }>{kw.title}</span></li>})}</ol>      
    }

    const getRelationshipTypes = () => {
        return <ol className={"list-disc pl-6 pt-2"}>{relationshipTypes.map(r => { 
            return <li key={r.id}><span className={isRelationshopSelected(r) ? "bg-orange-500" : "" } onClick={() => setSelectedRelationshipType(r)} >{r.name}</span></li>})}
            </ol>      
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
        return <ol className={"list-disc pl-6 pt-2"}>{relationships.map(r => { return <li key={r.id}>
            <span>{getRelationshipNameString(r)} <button className={"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1 text-center mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"} onClick={() => removeRelationshipHandler(r)}>x</button></span>
            </li>})}</ol>      
    }

    const getRelationshipSelector = () => {
        if (!keywordFrom || !keywordTo) return 
        return <select value={selectedRelationshipType?.id} onChange={e => setSelectedRelationshipType(relationshipTypes.find(rt => rt.id === Number(e.target.value)))}>
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

    const getNodes = () => {
        return keywords.map(kw => {
            return {
                id: kw.id,
                name: kw.title
            }
        })
    }

    const getLinks = () => {
        return relationships.map(r => {
            return {
                typeId: r.typeId,
                source: r.fromId,
                target: r.toId
            }
        })
    }

    return <div className={"grid grid-cols-2 gap-4 gap-y-5 p-5"}>
            <div className={""}>
                <h1 className={"text-2xl font-normal leading-normal mt-0 mb-2"}>Keywords </h1>
                <input
                    className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} 
                    value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="Type in new Keyword" type={"text"}/>
                <button className={"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-1 text-center ml-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={addKeywordHandler}>&rarr;</button>
                {getKeywords()}
            </div>
            <div className={""}>
                <h1 className={"text-2xl font-normal leading-normal mt-0 mb-2"}>Relationship Types</h1>
                <input 
                    className={"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                    value={newRelationshipType} onChange={e => setNewRelationshipType(e.target.value)} placeholder="Add Relationship Type" type={"text"}/>
                <button className={"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-1 text-center ml-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={addRelationshipTypeHandler}>&rarr;</button>
                {getRelationshipTypes()}
            </div>
            <div>
                <h1 className={"text-2xl font-normal leading-normal mt-0 mb-2"}>Relationships</h1>
                From {keywordFrom ? keywordFrom.title : "???"} to {keywordTo ? keywordTo.title: "???"} is {getRelationshipSelector()} <button className={"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-1 text-center mr-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} onClick={addRelationshipHandler}>&rarr;</button>
                {getRelationships()}
            </div>            
            <div>
                <h1 className={"text-2xl font-normal leading-normal mt-0 mb-2"}>Graph</h1>
                <NetworkGraph nodes={getNodes()} links={getLinks()} />
            </div>
        </div>
}