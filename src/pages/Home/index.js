import './home.css';
import Modal from '../../components/Modalpost';
import Header from '../../components/Header';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { TiWarning } from 'react-icons/ti';
import { AiFillLike} from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { MdOutlineModeComment } from 'react-icons/md';
import { FiFilter } from 'react-icons/fi';
import { BiSearchAlt } from 'react-icons/bi';
import userImage from '../../assets/userImage.png';
import noticeImage from '../../assets/imagemNoticia.png';
import noticeImage2 from '../../assets/imagemNoticia2.png';
import noticeImage3 from '../../assets/imagemNoticia3.png';
import userProfileFeed from '../../assets/user-profile-image.png';
import feedNoticeImage from '../../assets/notice-image-feed.png';


export default function Home(){
    return(
        <div>
            <Header/>
            <div className='content'>
                <div className='user'>
                    <div>
                        <img src={userImage} alt='Imagem do usuário'/>
                    </div>
                    <h4>Caique terra 2 <GoVerified size='15px' color='#8a8282'/></h4>
                    <h6>@animalWorld</h6>
                    <hr/>
                    <div className='user-options'>
                        <span><FaRegUserCircle size='12px'/> Meu perfil</span>
                        <span><IoSettingsOutline size='12px'/> Configurações</span>
                    </div>
                </div>
                <div className='feed'>
                    <div className='filter'>
                        <div className='button-filter'>
                            <button className='icon-filter-button'>
                                <FiFilter size='1.5em' color='#fff'/>
                                <span>Clique para abrir os filtros</span>
                            </button>
                        </div>
                        <div>
                            <label>Ordernado por:</label>
                            <select>
                                <option className='option'>Mais relevantes</option>
                            </select>
                        </div>
                        <div>
                            <label>Tópico:</label>
                            <select>
                                <option className='option'>Tecnologia</option>
                            </select>
                        </div>
                        <div>
                            <label>Estado:</label>
                            <select>
                                <option className='option'>Rio de Janeiro</option>
                            </select>
                        </div>
                        <div>
                            <label>Cidade:</label>
                            <select>
                                <option className='option'>Todas</option>
                            </select>
                        </div>
                        <div>
                            <label>Status:</label>
                            <select>
                                <option className='option'>Não verificadas</option>
                            </select>
                        </div>
                        <div>
                            <label>Empresa:</label>
                            <select>
                                <option className='option'>G1</option>
                            </select>
                        </div>
                        <button className='icon-filter-button-search'>
                            <BiSearchAlt size='1.8em' color='#fff'/>
                        </button>
                    </div>
                    <div className='post-creator'>
                        <div className='creator-logo-area'>
                            <img src={ userImage } alt='user'/>
                        </div>
                        <div className='creator-input-area'>
                            <button><input type='text' placeholder='O que vamos noticiar hoje?' disabled='True'/></button>
                        </div>
                    </div>
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
                <div className='notices'>
                    <h4>Mais relevantes da semana:</h4>
                    <div className='content-notices'>
                        <div>
                            <img src={noticeImage} alt='imagem da noticia'/>
                        </div>
                        <div className='more-details'>
                            <div>
                                <span className='site'>g1.com.br</span>
                                <br/>
                                <span className='notice-title'>IBM anuncia corte de 3,9 mil postos de trabalho</span>
                            </div>
                        </div>
                    </div>
                    <div className='content-notices'>
                        <div>
                            <img src={noticeImage2} alt='imagem da noticia'/>
                        </div>
                        <div className='more-details'>
                            <div>
                                <span className='site'>g1.com.br</span>
                                <br/>
                                <span className='notice-title'>A tecnologia usada no filme Avatar que vai revolucionar diagnóstico de doenças</span>
                            </div>
                        </div>
                    </div>
                    <div className='content-notices'>
                        <div>
                            <img src={noticeImage3} alt='imagem da noticia'/>
                        </div>
                        <div className='more-details'>
                            <div>
                                <span className='site'>g1.com.br</span>
                                <br/>
                                <span className='notice-title'>Veja como usar o Twitter feito um imbecil</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <Modal/>
        </div>
    )
}