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
                            <label>Cadastro</label>
                            <form>
                                <input className='user-info-singins' required type='email' placeholder="E-mail" name='e-mail'/>
                                <input className='user-info-singins' required type='password' placeholder='Senha' name='senha'/>
                                <input className='user-info-singins' required type='text' placeholder='Nome de usuário' name='userName'/>
                                <div className='singin-button'>
                                    <button type='submit'>CADASTRAR</button>
                                    <span>Ja possui uma conta? <a href='#action'>Faça Login!</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
};