import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Learn from '../pages/Learn';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/perfil' element={ <Perfil/> } />
                <Route path='/learn' element={ <Learn/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;