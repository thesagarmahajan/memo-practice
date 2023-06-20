import React, { memo, useCallback, useState } from "react"
import "./NoShit.css"
let ListItem = memo(({ id, title, status, handleListItemChange, handleCheckUnckeck }) => {
    return (<>
        {/* <li>
            <span onClick={()=>props.handleTaskClick(props.item.id)}>{props.item.status?<del>{props.item.title}</del>:props.item.title}</span>
        </li> */}
        <li> 
            <input type="checkbox" checked={status} onChange={()=>handleCheckUnckeck(id)}/>{JSON.stringify(status)}
            {(Math.random() * 100).toFixed()} <input type="text" value={title} onChange={(e) => handleListItemChange(id, e.target.value)} /></li>
    </>)
})
export default function ListAppNoShit() {
    let [count, setCount] = useState(1)
    let [items, setItems] = useState([
        { id: 1, title: "", status: false },
        { id: 2, title: "", status: false },
        { id: 3, title: "", status: false }
    ])
    let [item, setItem] = useState({ id: count, title: "", status: false })

    function handleSubmit(e) {
        e.preventDefault()
        // setCount(count=>count+1)
        count++
        setItem({ ...item, id: count })
        setCount(count)
        setItems([...items, item])
    }

    function handleChange(e) {
        setItem({ id: count, title: e.target.value, status: false })
    }

    let handleTaskClick = useCallback((id) => {
        /* let newItems = items.map(item=>{
            if(item.id==id){
                item.status = !item.status
            }
            return item;
        }) */
        setItems(prevItems => prevItems.map(item => {
            if (item.id == id) {
                item.title = "hi"
            }
            return item;
        }))
    }, [])

    let handleCheckUnckeck = useCallback((id) => {
        let newItems = items.map(item=>{
            if(item.id==id){
                item.status = !item.status
            }
            return item
        })
        setItems(newItems)
    }, [])

    let handleListItemChange = useCallback((id, value) => {
        console.log(value)
        let newItems = items.map(item => {
            if (item.id === id) {
                item.title = value
            }

            return item
        })
        setItems(newItems)
        // setItems(prevItems => prevItems.map(item => {
        //     if (item.id === id) {
        //         item.title = value
        //     }

        //     return item
        // }))
    }, [])

    return (<div>
        {JSON.stringify(items)}
        <form onSubmit={handleSubmit}>
            <label htmlFor="item">Add Item</label>
            <input id="item" onChange={handleChange} placeholder="Add Item" />
            <button>Add</button>
        </form>
        {
            items.map(item => {
                return (<ListItem key={item.id} id={item.id} status={item.status} title={item.title} handleListItemChange={handleListItemChange} handleCheckUnckeck={handleCheckUnckeck}/>)
            })
        }
    </div>)
}