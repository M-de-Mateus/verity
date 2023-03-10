import './modalpost.css';
import userProfile from '../../assets/user-profile-image.png';
import { GrFormClose } from 'react-icons/gr';
import { MdVideoLibrary } from 'react-icons/md';
import { MdImage } from 'react-icons/md';

export default function Modalpost(){
    return(
        <div className='modal-post'>
            <div className='modal-post-container'>
                <div className='modal-post-container-header'>
                    <div className='modal-post-container-title'>
                        <h2>Criar publicação</h2>
                    </div>
                    <div className='modal-post-container-close'>
                        <button>
                            <GrFormClose size={'2em'}/>
                        </button>   
                    </div>
                </div>
                <hr/>
                <div className='modal-post-container-user-info'>
                    <img src={userProfile} alt='user'/>
                    <span><strong>G1 NOTICIAS</strong></span>
                </div>
                <div className='modal-post-area'>
                    <form className='modal-post-area-form'>
                        <textarea type='text' placeholder='O que vamos noticiar hoje?'/>
                        <div className='modal-post-area-form-media'>
                            <span>Adicione à sua publicação</span>
                            <button><MdVideoLibrary color='#B51630' size={'1.3em'}/></button>
                            <button><MdImage color='#30706F' size={'1.3em'}/></button>
                        </div>
                        <div className='modal-post-area-form-ratio'>
                            <ul class="ratio-options">
                                <li class="option-modal low">
                                    <input name="levels" type="radio" id="low"/>
                                    <label for="low">Baixo</label>
                                </li>

                                <li class="option-modal medium">
                                    <input name="levels" type="radio" id="medium"/>
                                    <label for="medium">Médio</label>
                                </li>

                                <li class="option-modal high">
                                    <input name="levels" type="radio" id="high"/>
                                    <label for="high">Alto</label>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}