import './modalpost.css';
import userProfile from '../../assets/user-profile-image.png';

export default function Modalpost(){
    return(
        <div className='modal-post'>
            <div className='modal-post-container'>
                <div className='modal-post-container-title'>
                    <h2>Criar publicação</h2>
                </div>
                <hr/>
                <div className='modal-post-container-user-info'>
                    <img src={userProfile} alt='user image'/>
                    <span><strong>G1 NOTICIAS</strong></span>
                </div>
            </div>
        </div>
    )
}