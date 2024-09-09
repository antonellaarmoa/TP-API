import React from 'react'

const searchBar = () => {
  return (
    <div>
    <form>
        <div className='search-btn'> 
        <input type="text" className= "inputText" placeholder="Enter movie name"> </input>
        </div>
        <button>Submit</button>
    </form>
      
    </div>
  )
}

export default searchBar
