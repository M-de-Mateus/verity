import { useState, useContext } from 'react'
import logoImage from '../../assets/verity-logo-singin-area.png';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth';
import { IMaskInput } from "react-imask";
import "./singupcnpj.css";

export default function Singup(){
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cnpj, setCnpj ] = useState('');
    const [ nomeFantasia, setNomeFantasia ] = useState('');
    const [ tipo, setTipo ] = useState('');
    const [ cep, setCep ] = useState('');
    const [ rua, setRua ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ bairro, setBairro ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ estado, setEstado ] = useState('');
    const [ pais, setPais ] = useState('');
    const [ telefone, setTelefone ] = useState('');


    const { singUpCNPJ, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if( email !== '' & password !== '' & name !== '' & cnpj !== '' 
        & nomeFantasia !== '' & tipo !== '' & cep !== '' & rua !== ''
        & bairro !== '' & cidade !== '' & estado !== '' & pais !== '' & telefone !== ''){
            await singUpCNPJ(email, password, name, cnpj, nomeFantasia, tipo, cep, rua, numero, bairro,
                cidade, estado, pais, telefone)
        }

    };

    return(
        <div className='container-singup'>
            <div className="singup-area">
                <div className="singup-logo-area">
                    <img src={ logoImage } alt='Logo verity' />
                </div>
                <div className="singup-form-area">
                    <div className='singup-form-container'>
                        <div className='brand-name'>
                            <h1>Verity</h1>
                        </div>
                        <h2>Cadastro:</h2>
                        <div className='singup-form'>
                            <form onSubmit={handleSubmit}>
                                <input className='user-info-singups' required type='email' placeholder="E-mail" name='e-mail' 
                                value={email} onChange={(e) => setEmail(e.target.value)} />

                                <input className='user-info-singups' required type='password' placeholder='Senha' name='senha' 
                                value={password} onChange={(e) => setPassword(e.target.value) }/>

                                <input className='user-info-singups' required type='text' placeholder='Nome de usuário' name='userName'
                                value={name} onChange={(e) => setName(e.target.value)}/>

                                <IMaskInput className='user-info-singups' value={cnpj} onChange={(e) => setCnpj(e.target.value)} 
                                required mask='00.000.000/0000-00' placeholder="CNPJ" name='cnpj'/>

                                <input className='user-info-singups' required type='text' placeholder='Nome fantasia' name='nome fantasia'
                                value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Tipo de empresa (Ex.: Jornal, Blog, etc' name='tipo'
                                value={tipo} onChange={(e) => setTipo(e.target.value)}/>

                                <IMaskInput className='user-info-singups' value={cep} onChange={(e) => setCep(e.target.value)} 
                                required mask='00.000-000' placeholder="CEP" name='cep'/>

                                <input className='user-info-singups' required type='text' placeholder='Rua' name='rua'
                                value={rua} onChange={(e) => setRua(e.target.value)}/>

                                <input className='user-info-singups' required type='number' placeholder='Número' name='numero'
                                value={numero} onChange={(e) => setNumero(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Bairro' name='bairro'
                                value={bairro} onChange={(e) => setBairro(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Cidade' name='cidade'
                                value={cidade} onChange={(e) => setCidade(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Estado' name='estado'
                                value={estado} onChange={(e) => setEstado(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Pais' name='pais'
                                value={pais} onChange={(e) => setPais(e.target.value)}/>

                                <input className='user-info-singups' required type='text' placeholder='Telefone' name='tel'
                                value={telefone} onChange={(e) => setTelefone(e.target.value)}/>

                                <div className='singup-button'>
                                    <button type='submit'>{loadingAuth ? 'CARREGANDO...' : 'CADASTRAR'}</button>
                                    <span>Ja possui uma conta? <Link to='/singin'>Faça Login!</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};