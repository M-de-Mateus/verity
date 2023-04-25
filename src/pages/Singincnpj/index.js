import { useState, useContext } from'react'
import './singin.css'
import logoImage from '../../assets/verity-logo-singin-area.png';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';



export default function Singin(){
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const { singInCNPJ, loadingAuth  } = useContext(AuthContext);

    async function handleSignIn(e){
        e.preventDefault();

        if( email !== '' & password !== ''){
            await singInCNPJ(email, password);
        }
    }

    return(
        <div className='container-singin'>
            <div className="singin-area">
                <div className="singin-logo-area">
                    <img src={ logoImage } alt='Logo verity' />
                </div>
                <div className="singin-form-area">
                    <div className='singin-form-container'>
                        <div className='brand-name'>
                            <h1>Verity</h1>
                        </div>
                        <div className='singin-form'>
                            <label>LOGIN - CNPJ</label>
                            <form onSubmit={handleSignIn}>
                                <input className='user-info-singins' required type='email' placeholder="E-mail" name='e-mail'
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <input className='user-info-singins' required type='password' placeholder='Senha' name='senha'
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className='singin-texts'>
                                    <div className='singins-text-one'>
                                        <input className='singins-text-one-input' type='checkbox' name='lembrar'/>
                                        <span>Lembrar de mim</span>
                                    </div>
                                    <div>
                                        <span><a href="#action">Esqueceu a senha?</a></span>
                                    </div>
                                </div>
                                <div className='singin-button'>
                                    <button type='submit'>
                                        {loadingAuth ? "CARREGANDO..." : "ENTRAR" }
                                    </button>
                                    <span>Novo aqui? <Link to='/singupcnpj'> Crie uma conta!</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};