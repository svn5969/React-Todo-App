import React from 'react';
import todo from "../component/images/todo.png";
import "../App.css"

const Todo = () => {
    return (
        <div className="main-div">
         <div className="child-div">
             <figure>
                 <img src={todo} alt="" />
                 <figcaption>Add Your List Here ✌️</figcaption>
             </figure>
             <div className="addItems">
                 <input type="text" placeholder="✍ Add Items..." />
                 <i className="fa fa-plus add-btn" title="Add Item"></i>
             </div>
             
             <div className="showItems">
                 <div className="eachItem">
                     <h3>Apple</h3>
                     <i className="fa fa-trash add-btn" title="Delete Item"></i>
                 </div>
             </div>

             {/* clear all */}
             <div className="showItems">
                 <button className="btn effect04" data-sm-link-text="Remove All"><span>CHECK LIST</span></button>
             </div>

         </div>
        </div>
    );
};

export default Todo;