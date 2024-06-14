import React from "react";
import "../App.css"
import {MdClose} from "react-icons/md"

const Formtable = ({handleSubmit,handleOnChange,handleClose,rest})=>{
    return (
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleClose}><MdClose/></div>
            <label htmlFor="productId">ProductId:</label>
            <input type="number" id="productId" name="productId" onChange={handleOnChange} value={rest.productId}/>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" onChange={handleOnChange} value={rest.price}/>
            <label htmlFor="featured">Featured:</label>
            <input type="boolean" id="featured" name="featured" onChange={handleOnChange} value={rest.featured}/>
            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" name="rating" onChange={handleOnChange} value={rest.rating}/>
            <label htmlFor="createdAt">CreatedAt:</label>
            <input type="date" id="createdAt" name="createdAt" onChange={handleOnChange} value={rest.createdAt}/>
            <label htmlFor="company">Company:</label>
            <input type="text" id="company" name="company" onChange={handleOnChange} value={rest.company}/>
            <button className="btn">Submit</button>   
          </form>
      </div>
    )
}

export default Formtable;

