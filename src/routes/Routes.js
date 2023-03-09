import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Learn from '../pages/Learn';
import Singin from '../pages/Singin';
import LoginOpt from '../pages/LoginOpt';
import Singincnpj from '../pages/Singincnpj';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/perfil' element={ <Perfil/> } />
                <Route path='/learn' element={ <Learn/> } />
                <Route path='/loginopt' element={ <LoginOpt/> } />
                <Route path='/singin' element={ <Singin/> } />
                <Route path='/singincnpj' element={ <Singincnpj/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;