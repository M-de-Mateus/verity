import './singin.css'
import { IMaskInput } from "react-imask";
import logoImage from '../../assets/verity-logo-singin-area.png';

export default function Singin(){
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
                            <label>LOGIN</label>
                            <form>
                                <IMaskInput className='user-info-singins' required mask='000.000.000-00' placeholder="CPF" name='cpf'/>
                                <input className='user-info-singins' required type='password' placeholder='Senha' name='senha'/>
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
                                    <button type='submit'>ENTRAR</button>
                                    <span>Novo aqui? <a href='#action'>Crie uma conta!</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};