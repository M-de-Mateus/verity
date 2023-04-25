import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth';
import { IMaskInput } from "react-imask";
import logoImage from '../../assets/verity-logo-singin-area.png';

export default function Singin(){
    const [ email, setEmail] = useState('');
    const [ senha, setSenha] = useState('');
    const [ cpf, setCpf] = useState('');
    const [ name, setName] = useState('');

    const { loadingAuth, singUpCPF  } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if( email !== '' & senha !== '' & name !== '' & cpf !== '' ){
            await singUpCPF(email, senha, name, cpf)
        };
    };

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
                            <label>Cadastro</label>
                            <form onSubmit={handleSubmit}>
                                <input className='user-info-singins' required value={email} onChange={(e)=> setEmail(e.target.value)} 
                                type='email' placeholder="E-mail" name='e-mail'/>

                                <input className='user-info-singins' required value={senha} onChange={(e)=> setSenha(e.target.value)}
                                type='password' placeholder='Senha' name='senha'/>

                                <IMaskInput className='user-info-singins' value={cpf} onChange={(e) => setCpf(e.target.value)} 
                                required mask='000.000.000-00' placeholder="CPF" name='cpf'/>
                                
                                <input className='user-info-singins' required value={name} onChange={(e) => setName(e.target.value)}
                                type='text' placeholder='Nome de usuário' name='userName'/>

                                <div className='singin-button'>
                                <button type='submit'>{loadingAuth ? 'CARREGANDO...' : 'CADASTRAR'}</button>
                                    <span>Ja possui uma conta? <Link to='/singincpf'>Faça Login!</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};