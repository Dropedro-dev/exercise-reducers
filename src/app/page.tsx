"use client"
import { listReducer } from "@/reducers/listReducer";
import { useReducer, useState } from "react";
import { text } from "stream/consumers";

const Page =()=> {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addField, setAddField] = useState('')

  const handleAddButton =()=> {
    if (addField.trim() ==='') return false;

    dispatch({
      type: 'add',
      payload: {
        text: addField.trim()
      }
    })
    setAddField('');
  }

  const handleCheck =(id:number)=> {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    })

  }

  const handleEdit = (id:number) => {
    const item = list.find(it => it.id ===id);
    if (!item) return false;

    const newText = window.prompt("Editar tarefa", item.text)
    if(!newText || newText?.trim() === '') return false;
    dispatch({
      type:"editText",
      payload: {
        id,
        newText: newText
      }
    })    
  }

  const handleRemoveClick = (id: number)=> {
    if(!window.confirm("excluir item?")) return false;
    dispatch({
      type: 'remove',
      payload: {id}
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
        <button 
          className="p-4"
          onClick={handleAddButton}>ADD</button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map(item=>(
          <li key={item.id} 
            className="flex items-center p-3 my-3 border-b border-gray-700"
          >
            <input 
              type="checkbox" 
              className="w-6 h-6 mr-4"
              defaultChecked={item.done}
              onClick={() => handleCheck(item.id)}
            />
            <p className="flex-1 text-lg">{item.text}</p>
            <button 
              className="mx-4 hover:text-blue-300"
              onClick={()=> handleEdit(item.id)}
            >Edit</button>
            <button 
              className="mx-4 hover:text-blue-300"
              onClick={()=>handleRemoveClick(item.id)}
            >excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page;