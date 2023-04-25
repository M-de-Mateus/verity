import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function Private({ children }){
    const { singned, loading } = useContext(AuthContext);

    if(loading){
        return(
            <div></div>
        )  
    }

    if(!singned){
        return <Navigate to="/"/>
    }

    return children;
}