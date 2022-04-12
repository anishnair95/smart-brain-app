import React from 'react';
import 'tachyons';
import './FaceRecognition.css';
const FaceRecognition = (props) => {

    if(props.imageUrl!='' && props.box!=undefined){ 
    return (
        <div className='center ma'>

            <div className='absolute mt2'>
            <img id='inputImage' src={props.imageUrl} width='500px' height='auto' />
            <div className="bounding-box" style={{top:props.box.topRow,right:props.box.rightCol,bottom:props.box.bottomRow,left:props.box.leftCol}}></div>
            </div>
        </div>
    )}
    else
    return(
        <div className='center'>
        </div>
    )
}

export default FaceRecognition;