// without get data from local storage...

import React, { useEffect, useState } from 'react';
import todo from "../component/images/todo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"


const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([])
   
    const addItem = () => {
        if (!inputData) {
            toast.error('Please Add the Item', {
                position: "top-center"
            })
        }else {
            setItems([...items, inputData])
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
    const deleteItem=(id) => {
     console.log(id);
     const updatedItems = items.filter((elem,ind)=>{
         return ind !== id
     })
     setItems(updatedItems)
    }
    // remove all items 

    const removeAll=() => {
        if (items) {
            alert('Are You Sure ?')
            setItems([])
        }
        
    }

    // add data to local storage
    useEffect(()=>{
     localStorage.setItem('lists',JSON.stringify(items))
    },[items])
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
                    <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                    <ToastContainer />
                </div>

                <div className="showItems">

                    {
                        items.map((elem, ind) => {
                            return (
                                <div className="eachItem" key={ind}>
                                    <h3>{elem}</h3>
                                    <i className="fa fa-trash add-btn" title="Delete Item" onClick={()=>deleteItem(ind)}></i>
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