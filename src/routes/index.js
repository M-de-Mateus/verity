import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Learn from '../pages/Learn';
import Singincnpj from '../pages/Singincnpj';
import Singincpf from '../pages/Singincpf';
import Singupcnpj from '../pages/SingupCNPJ';
import Singupcpf from '../pages/SingupCPF';
import SinginOpt from '../pages/SinginOpt';
import Private from './Private';


function RoutesApp(){
    return(
            <Routes>
                <Route path='/' element={ <SinginOpt/> } />
                <Route path='/home' element={ <Private><Home/></Private> } />
                <Route path='/perfil' element={ <Private><Perfil/></Private> } />
                <Route path='/learn' element={ <Private><Learn/></Private> } />
                <Route path='/singincpf' element={ <Singincpf/> } />
                <Route path='/singincnpj' element={ <Singincnpj/> } />
                <Route path='/singupcnpj' element={ <Singupcnpj/> } />
                <Route path='/singupcpf' element={ <Singupcpf/> } />
            </Routes>
    )
}

export default RoutesApp;