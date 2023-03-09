import './loginopt.css'
import logoImage from '../../assets/verity-logo-singin-area.png';
import { Link } from 'react-router-dom';

export default function Singin(){
    return(
        <div className='container-singin'>
            <div className="singin-area">
                <div className="singin-logo-area">
                    <img src={ logoImage } alt='Logo verity' />
                </div>
                <div className="opt-area">
                    <div className='opt-container'>
                        <div className='opt-buttons'>
                            <Link to='/singin'><button type='submit'>Pessoa Fisica</button></Link>
                            <Link to='/singincnpj'><button type='submit'>Pessoa Juridica</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};