"use client"
import { listReducer } from "@/reducers/listReducer";
import { useReducer, useState } from "react";

const Page =()=> {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState('')

  const handleAddButton =()=> {
    if (addField.trim() ==='') return false;

    dispatch({
      type: 'add',
      payload: {
        text: addField
      }
    })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md border border-gray-400 p-4 my-4">
        <input
        type="text"
        className="flex-1 rounded-md border border-black p-3 bg-transparent outline-none"
        placeholder="Digite um item"
        value={addField}
        onChange={e=> setAddField(e.target.value)}
        />
        <button className="p-4"onClick={handleAddButton}>ADD</button>
      </div>
      <ul>
        {list.map(item=>(
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
    </div>
  )
}

export default Page;