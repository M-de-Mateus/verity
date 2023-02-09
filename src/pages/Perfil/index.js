import './perfil.css';
import cover from '../../assets/cover.png';
import userImage from '../../assets/userImage.png'
import { GoVerified } from 'react-icons/go';
import { TiCamera } from 'react-icons/ti';
import { AiFillLike} from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { MdOutlineModeComment } from 'react-icons/md';
import { TiWarning } from 'react-icons/ti';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { MdHouse } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { ImNewspaper } from 'react-icons/im';
import { AiOutlineFileSearch } from 'react-icons/ai';
import userProfileFeed from '../../assets/user-profile-image.png';
import feedNoticeImage from '../../assets/notice-image-feed.png';

export default function Perfil(){
    return(
        <div className='content-profile'>
            <div className='user-profile-cover'>
                <div className='profile-cover'>
                    <img src={cover} alt='capa'/>
                </div>
                <div className='profile-info'>
                    <div className='profile-user-image'>
                        <img src={userImage} alt='capa'/>
                    </div>
                    <div className='profile-user-name'>
                        <div>
                            <h3>Caique Terra 2 <GoVerified size='.7em'/></h3>
                            <h6>@animalWorld</h6>
                        </div>
                    </div>
                </div>
                <div className='area-button-cover'>
                    <button>
                        <div className='content-button'>
                            <TiCamera color='#fff' size='2em'/> 
                            <div className='text'>
                                Editar foto de capa
                            </div>
                        </div>
                    </button>
                </div>
            </div>      
            <div className='user-profile-area'>
                <div className='user-profile-area-column'>
                    <div className='user-information'>
                        <h3>Apresentação</h3>
                        <div className='bio-text'>
                            <div className='bio'>Ceo da Animal World</div>  
                        </div>
                        <button className='button-edit'>EDITAR BIO</button>
                        <div className='more-user-information'>
                            <div className='more-user-information-details'>
                                <div><MdHouse size='1.5em' color='#30706f'/></div>
                                <div>Mora em <strong>Santa Cruz da Serra</strong></div>
                            </div>
                            <div className='more-user-information-details'>
                                <div><FaMapMarkerAlt size='1.5em' color='#30706f'/></div>
                                <div>De <strong>Rio de janeiro</strong></div>
                            </div>
                        </div>
                        <button className='button-edit'>EDITAR DETALHES</button>
                    </div>
                    <div className='user-information'>
                        <h3>Sobre a empresa</h3>
                        <div className='enterprise-rating-range'>
                            <h5>Nivel de confiabilidade:</h5>
                            <br/>
                            <input type="range" min="0" max="100" value="92.85" class="range-style" id="rating-range"/>
                        </div>
                        <div className='enterprise-more-info'>
                            <div className='enterprise-list-info'>
                                <div className='enterprise-info-icon'>
                                    <ImNewspaper size='2.5em' color='#30706f'/>
                                </div>
                                <div className='enterprise-text-info'>
                                    <p>10 mil noticias publicadas</p>
                                </div>
                            </div>
                            <div className='enterprise-list-info'>
                                <div className='enterprise-info-icon'>
                                    <AiOutlineFileSearch size='2.5em' color='#30706f'/>
                                </div>
                                <div className='enterprise-text-info'>
                                    <p>09 mil noticias verificadas</p>
                                </div>
                            </div>
                            <div className='enterprise-list-info'>
                                <div className='enterprise-info-icon'>
                                    <TiWarning size='2.5em' color='rgb(181,22,22)'/>
                                </div>
                                <div className='enterprise-text-info'>
                                    <p>02 strikes recebidos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='user-information'>
                        <h3>Histórico de Strikes</h3>
                        <br/>
                        <div className='enterprise-list-info'>
                            <div className='enterprise-info-icon'>
                                <TiWarning size='2.5em' color='rgb(181,22,22)'/>
                            </div>
                            <div className='enterprise-text-info'>
                                <p>16/08/2022 - <strong>Bolsonaro faz algo ruim como sempre</strong> - Noticia de alto nível foi postada como baixo nivel.</p>
                            </div>
                        </div>
                        <hr color='#e9e9e9'/>
                        <div className='enterprise-list-info'>
                            <div className='enterprise-info-icon'>
                                <TiWarning size='2.5em' color='rgb(181,22,22)'/>
                            </div>
                            <div className='enterprise-text-info-expired'>
                                <p>16/08/2022 - <strong>Bolsonaro faz algo ruim como sempre</strong> - Noticia de alto nível foi postada como baixo nivel.</p>
                            </div>
                        </div>
                        <hr color='#e9e9e9'/>
                    </div>
                </div>
                <div className='user-profile-area-column'>
                    <div className='feed-posts'>
                        <div className='feed-post-header'>
                            <div className='feed-post-user-profile-info'>
                                <div className='feed-post-user-profile'>
                                    <img src={userProfileFeed} alt='imagem do usuário'/>
                                    <br/>
                                    <div className='feed-post-user-name'>
                                        <span id='name'><strong>G1 NOTICIAS <GoVerified size='12px' color='#30706f'/></strong></span>
                                        <span id='status'><TiWarning size='1em' color='#FFC700'/> Noticia não verificada</span>
                                    </div>
                                </div>
                                <div className='feed-post-options'>
                                    <span id='options'><IoEllipsisHorizontal size='1.5em'/></span>
                                    <span id='time'>1 h</span>
                                </div>
                            </div>
                        </div>
                        <div className='feed-post-text'>
                            <p>Investigação concluiu que Glaidson estaria chefiando a quadrilha de dentro da cadeia: http://glo.bo/3kIYSnj #g1</p>
                        </div>
                        <div className='feed-media'>
                            <div className='feed-image-notice'>
                                <img src={feedNoticeImage} alt='notice'/>
                            </div>
                            <div className='media-details'>
                                <div>
                                    <span className='media-site'>g1.com.br</span>
                                    <br/>
                                    <span className='media-notice-title'>Faraó dos Bitcoins é transferido para presídio de segurança máxima fora do RJ</span>
                                </div>
                            </div>
                        </div>
                        <div className='feed-post-numbers'>
                            <div className='feed-post-numbers-info'>
                                <div><AiFillLike color='#30706f' size='1.2em'/></div>
                                <div> 0 curtidas</div>
                            </div>
                            <div className='feed-post-numbers-info'>
                                <div><MdOutlineModeComment size='1.2em'/></div>
                                <div> 0 comentários</div>
                            </div>
                        </div>
                        <hr color='#E9E9E9'/>
                        <div className='feed-buttons'>
                            <button className='feed-buttons-type'>
                                <div><AiFillLike size='1.4em'/></div>
                                <div>Curtir</div>
                            </button>
                            <button className='feed-buttons-type'>
                                <div><MdModeComment size='1.4em'/></div>
                                <div>Comentar</div>
                            </button>
                        </div>
                        <hr color='#E9E9E9'/>
                        <div className='feed-comment-area'>
                            <div className='feed-user-image-comment'>
                                <img src={userImage} alt='usuario'/>
                            </div>
                            <div className='feed-input-comment-box'>
                                <input type='text' placeholder='Escreva um comentário...'/>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}