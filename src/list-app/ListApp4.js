import { useCallback } from "react"
import { memo } from "react"
import { useState } from "react"

const ListItem = memo(({item, handleCheckUnckeck}) => {
    return (
        <li>
            <input type="checkbox" checked={item.status} onChange={()=>handleCheckUnckeck(item.id)} /> {item.status?<del>{item.title}</del>:item.title}
        </li>
    )
})

export default function ListApp4(){

    let [items, setItems] = useState([])
    let [item, setItem] = useState({})
    let [idCounter, setIdCounter] = useState(0) 

    const handleChange = (e) => {
        setItem({title:e.target.value, status:false})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIdCounter(idCounter+1)
        setItems([...items, {...item, id:idCounter}])
    }

    // Working !!
    /* const handleCheckUnckeck = useCallback((id) => {

        setItems((prevItems) =>
            prevItems.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
            )
        );
    }, []) */

    // Not working. Need to find out why?
    const handleCheckUnckeck = useCallback((id) => {
        // Items variable is blank array which is the default value for items. 
        // Need to find out why it is happening? How it get's solved using useState functio version? etc.
        console.log(items)
        let newItems = items.map((item) => {
            if(item.id === id) {  item.status = !item.status } 
            return item
        })
        setItems(newItems);
    }, []) // Without items dependency all the items will be vanished
    
    return (<div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add Item" onChange={handleChange}/>
            <button type="submit">Add</button>
        </form>
        {JSON.stringify(items)}
        <ul>
            {
                items.map(item=>{
                    return (
                        <ListItem key={item.id} item={item} handleCheckUnckeck={handleCheckUnckeck} />
                    )
                })
            }
            
        </ul>
    </div>)
}





/* setItems((prevItems) =>
    prevItems.map((item) =>
    item.id === id ? { ...item, status: !item.status } : item
    )
);

setItems(oldItems => oldItems.map(item=>{
    if(item.id==id){
        item.status=!item.status   
    }
    return item
}))

let newItems = items.map(item=>{
    if(item.id==id){
        item.status=!item.status
    }
    return item
})

setItems(newItems) */