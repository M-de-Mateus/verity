import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Learn from '../pages/Learn';
import Singincnpj from '../pages/Singincnpj';
import Singincpf from '../pages/Singincpf';
import Singupcnpj from '../pages/SingupCNPJ';
import Singupcpf from '../pages/SingupCPF';
import SingupOpt from '../pages/SingupOpt';
import SinginOpt from '../pages/SinginOpt';


function RoutesApp(){
    return(
            <Routes>
                <Route path='/' element={ <SinginOpt/> } />
                <Route path='/home' element={ <Home/> } />
                <Route path='/perfil' element={ <Perfil/> } />
                <Route path='/learn' element={ <Learn/> } />
                <Route path='/singupopt' element={ <SingupOpt/> } />
                <Route path='/singincpf' element={ <Singincpf/> } />
                <Route path='/singincnpj' element={ <Singincnpj/> } />
                <Route path='/singupcnpj' element={ <Singupcnpj/> } />
                <Route path='/singupcpf' element={ <Singupcpf/> } />
            </Routes>
    )
}

export default RoutesApp;