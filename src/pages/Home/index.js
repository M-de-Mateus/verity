import './home.css';
import Modal from '../../components/Modalpost';
import Modalfilters from '../../components/Modalfilters';
import Header from '../../components/Header';
import AutolinkerWrapper from 'react-autolinker-wrapper';
import { ReactTinyLink } from 'react-tiny-link'
import { db } from '../../services/firebaseconnection';
import { useContext, useState, useEffect } from 'react';
import { IoSettingsOutline, IoEllipsisHorizontal } from 'react-icons/io5';
import { MdOutlineModeComment, MdModeComment, MdOutlineShare } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { TiWarning } from 'react-icons/ti';
import { AiFillLike} from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { BiSearchAlt } from 'react-icons/bi';
import defaultMedia from '../../assets/default.jpg';
import avatar from '../../assets/avatar.png';
import noticeImage from '../../assets/imagemNoticia.png';
import noticeImage2 from '../../assets/imagemNoticia2.png';
import noticeImage3 from '../../assets/imagemNoticia3.png';


import { AuthContext } from '../../contexts/auth';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';





export default function Home(){

    const { user } = useContext(AuthContext);

    const [ modalPost, setModalPost ] = useState(false);
    const [ modalFilter, setModalFilter ] = useState(false);
    const [ publis, setPublis ] = useState([]);

    const postsRef = collection(db, 'posts');
    const posts = getDocs(query(postsRef, orderBy('Data', 'desc')));

    useEffect(()=>{

        async function loadPosts(){
            await posts
            .then((snapshot)=>{
                updatePosts(snapshot);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        loadPosts();

        return () => {

        }

    },[])

    async function updatePosts(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snapshot.forEach( doc => {
                lista.push({
                    Id: doc.id,
                    Anexo: doc.data().Anexo,
                    Autor: doc.data().Autor,
                    FotoPerfil: doc.data().FotoPerfil,
                    Conteudo: doc.data().Conteudo,
                    Imagem: doc.data().Imagem,
                    Data: doc.data().Data.toDate(),
                    Estado: doc.data().Estado,
                    IdComentarios: doc.data().IdComentarios,
                    Municipio: doc.data().Municipio,
                    Nivel: doc.data().Nivel,
                    Status: doc.data().Status,
                    StatusAutor: doc.data().StatusAutor,
                    Link: doc.data().Link,
                    Topico: doc.data().Topico,
                    Uid: doc.data().Uid
                })
            })

            setPublis( publis => [...publis, ...lista])
            console.log(lista)
        }
    }

    function openModal(){
      setModalPost(!modalPost)
    }

    function openFilterModal(){
        setModalFilter(!modalFilter)
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <div className='user'>
                    <div>
                        <img src={user.FotoPerfil === null ? avatar : user.FotoPerfil} alt='Imagem do usuário'/>
                    </div>
                    <h4>{user.NomeUsuario} {user.StatusVerificação === "Não verificada" ? "" :
                    <GoVerified size='15px' color='#30706f'/>}</h4>
                    <hr/>
                    <div className='user-options'>
                        <span><FaRegUserCircle size='12px'/> Meu perfil</span>
                        <span><IoSettingsOutline size='12px'/> Configurações</span>
                    </div>
                </div>
                {modalFilter && (
                    <Modalfilters
                        close={openFilterModal}
                    />
                )}
                
                <div className='feed'>
                    <div className='filter'>
                        <div className='button-filter'>
                            <button className='icon-filter-button' onClick={openFilterModal}>
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
                            <label>Municipio:</label>
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
                    {user.Pessoa === "Juridica" ? 
                    <div className='post-creator'>
                        <div className='creator-logo-area'>
                            <img src={user.FotoPerfil === null ? avatar : user.FotoPerfil} alt='user'/>
                        </div>
                        <div className='creator-input-area'>
                            <button onClick={openModal}><input type='text' placeholder='O que vamos noticiar hoje?' disabled='True'/></button>
                        </div>
                    </div>
                       : "" }
                    <div className='feed-posts'>
                        {publis.map((item, index) => {
                            return(
                                <>
                                <div className='container-feed-posts' key={index}>
                                <div className='feed-post-header'>
                                    <div className='feed-post-user-profile-info'>
                                        <div className='feed-post-user-profile'>
                                            <img className='feed-post-user-image'  
                                            src={item.FotoPerfil === null ? avatar : item.FotoPerfil} alt='imagem do usuário' />
                                            <br />
                                            <div className='feed-post-user-name'>
                                                <span id='name'><strong> {item.Autor} 
                                                {item.StatusAutor === "Verificado" ? (<GoVerified size='12px' color='#30706f' />) 
                                                :
                                                ("")
                                                }</strong></span>
                                                <span id='status'><TiWarning size='1em' color='#FFC700' /> Noticia não verificada</span>
                                            </div>
                                        </div>
                                        <div className='feed-post-options'>
                                            <span id='options'><IoEllipsisHorizontal size='1.5em' /></span>
                                            <span id='time'>1 h</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='feed-post-text'>
                                    {item.Conteudo ? 
                                        <AutolinkerWrapper
                                           tagName='p'
                                           text={item.Conteudo}
                                           options={{
                                            newWindow: true,
                                            stripPrefix: false,
                                          }}
                                        />
                                     : 
                                     ""}
                                </div>
                                <div className='feed-media'>
                                    {item.Imagem ? (
                                        <div className='feed-image-notice'>
                                            <img src={item.Imagem} alt='notice' />      
                                        </div>
                                    ) :
                                    item.Link[0] !== "" ? (
                                        <div>
                                            <ReactTinyLink
                                                cardSize="large"
                                                showGraphic={true}
                                                maxLine={2}
                                                minLine={1}
                                                loadSecureUrl={true}
                                                defaultMedia={defaultMedia}
                                                url={item.Link[0]}
                                                userAgent="Mozilla/5.0 
                                                (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) 
                                                Chrome/58.0.3029.110 Safari/537.3 Edge/16.16299"
                                            />
                                        </div>
                                    ) :
                                        ""
                                    }
                                </div>
                                <div className='feed-post-numbers'>
                                    <div className='feed-post-numbers-info'>
                                        <div><AiFillLike color='#30706f' size='1.2em' /></div>
                                        <div> 0 curtidas</div>
                                    </div>
                                    <div className='feed-post-numbers-info'>
                                        <div><MdOutlineModeComment size='1.2em' /></div>
                                            <div> 0 comentários</div>
                                        </div>
                                    </div>
                                    <hr color='#E9E9E9' /><div className='feed-buttons'>
                                        <button className='feed-buttons-type'>
                                            <div><AiFillLike size='1.4em' /></div>
                                            <div>Curtir</div>
                                        </button>
                                        <button className='feed-buttons-type'>
                                            <div><MdModeComment size='1.4em' /></div>
                                            <div>Comentar</div>
                                        </button>
                                        <button className='feed-buttons-type'>
                                            <div><MdOutlineShare size='1.4em' /></div>
                                            <div>Compartilhar</div>
                                        </button>
                                </div>
                                <hr color='#E9E9E9' /><div className='feed-comment-area'>
                                    <div className='feed-user-image-comment'>
                                        <img src={user.FotoPerfil === null ? avatar : user.FotoPerfil} alt='usuario' />
                                    </div>
                                    <div className='feed-input-comment-box'>
                                        <input type='text' placeholder='Escreva um comentário...' />
                                    </div>
                                </div>
                                </div></>
                            )
                        })}   
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
            {modalPost && (
                <Modal
                    close={openModal}
                    user = {user}
                />
            )}
        </div>
    )
}