import React from 'react';

const Pup =(props) => {
    const {id,image,isGoodDog,name} = props.pup
    return(
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={()=>props.toggleGoodDog(id)}>{isGoodDog? "Good Dog!" : "Bad Dog" }</button>
        </div>
    )
}

export default Pup