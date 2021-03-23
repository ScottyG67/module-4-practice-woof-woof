import React from 'react'

const PupBar = (props) => {
    const {id,image,isGoodDog,name} = props.pup
    return(
        <span onClick={()=>props.showPup(id)}>
            {name}
        </span>
    )
    
} 
export default PupBar