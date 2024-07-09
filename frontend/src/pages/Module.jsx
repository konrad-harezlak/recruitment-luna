import React,{useState} from 'react';
import {useParams} from 'react-router-dom';

const Module = () =>{
    const {id} = useParams();
    const [module, setModule] = useState(null);
    const fetchModule = async()=>{

        
    }
    return(
        <div className='module-container'>
            
        </div>
    )
}
export default Module;