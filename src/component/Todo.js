import React, { useEffect, useState } from 'react';
import todo from "../component/images/todo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

// to get data from Local Storage 
const getLocalItems = () => {
    let list = localStorage.getItem('lists')
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [toggleEdit,setToggleEdit]= useState(true)
    const [editSingleItem,setEditSingleItem] = useState(null)

    const addItem = () => {
        if (!inputData) {
            toast.error('Please Add the Item', {
                position: "top-center"
            })
        }else if (inputData && !toggleEdit){
            setItems(
                items.map((elem)=>{
                  if (elem.id=== editSingleItem) {
                      return {...elem,name:inputData}
                  }
                  return elem
                })
               
            )
            setToggleEdit(true)
            setInputData('')
            setEditSingleItem(null)
        }
         else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData])
            setInputData('')
        }

    }
    // enter key press
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            //   console.log("enter press working");
            addItem()
        }
    };
    // delete items
    const deleteItem = (index) => {
        console.log(index);
        const updatedItems = items.filter((elem) => {
            return elem.id !== index
        })
        setItems(updatedItems)
    }

    // edit Item  
    // When user Click on edit button 
    //1: get the id and name of the data which user clicked to edit
    // 2: set the toggle mode to change the submit button into edit button
    //3: Now update the value of the setInput with the new updated value to edit 
    //4: To pass the current element Id to new state variable for reference

    const editItem = (id) => {
           let newEditItem = items.find((elem)=>{
             return elem.id === id
           })
           console.log(newEditItem);
           setToggleEdit(false)
           setInputData(newEditItem.name)
           setEditSingleItem(id)
    }


    // remove all items 

    const removeAll = () => {
        if (items) {
            alert('Are You Sure ?')
            setItems([])
        }

    }

    // add data to local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])
    return (
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={todo} alt="" />
                    <figcaption>Add Your List Here ✌️</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="✍ Add Items..."
                        value={inputData} onChange={(e) => setInputData(e.target.value)}
                        onKeyPress={handleKeypress}
                    />
                    {
                        toggleEdit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                    }
                    
                    <ToastContainer />
                </div>

                <div className="showItems">

                    {
                        items.map((elem) => {
                            return (
                                <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                {/* clear all */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>

            </div>
        </div>
    );
};

export default Todo;