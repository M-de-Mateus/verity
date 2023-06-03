import './home.css';
import Modal from '../../components/Modalpost';
import Modalfilters from '../../components/Modalfilters';
import Header from '../../components/Header';
import AutolinkerWrapper from 'react-autolinker-wrapper';
import api from '../../services/api';
import { toast } from "react-toastify";
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
import { collection, getDocs, orderBy, query, where, and } from 'firebase/firestore';




export default function Home(){

    const { user } = useContext(AuthContext);

    const [ modalPost, setModalPost ] = useState(false);
    const [ modalFilter, setModalFilter ] = useState(false);
    const [ publis, setPublis ] = useState([]);
    const [ order, setOrder ] = useState('desc');
    const [ topico, setTopico ] = useState(null);
    const [ estado, setEstado ] = useState(null);
    const [ municipio, setMunicipio ] = useState(null);
    const [ status, setStatus ] = useState(null);
    const [ empresa, setEmpresa ] = useState(null);
    const [ autorUnico, setAutorUnico ] = useState([]);
    const [ locais, setLocais ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ cidades, setCidades ] = useState([]);

    const postsRef = collection(db, 'posts');
    const posts = query(postsRef, orderBy('Data', 'desc'));
    const usersRef = collection(db, 'usersCNPJ');
    const users = query(usersRef);


    useEffect(()=>{

        async function loadPosts(){
            await getDocs(posts)
            .then((snapshot)=>{
                updatePosts(snapshot);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        async function loadUsers(){
            await getDocs(users)
            .then((snapshot)=>{
                updateUsers(snapshot);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
       

        loadPosts();
        loadUsers();

        return () => {

        }

    },[])

    useEffect(()=>{

        async function getLocal(){
            await api.get("?orderBy=nome")
            .then((response)=>{
                setLocais(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        
        getLocal()
            
    },[locais])

    useEffect(()=>{

        api.get(`/${selected}/municipios?orderBy=nome`)
        .then(async (response)=>{
            setCidades(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        
            
    },[selected])

   

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

        }
    }


    async function updateNewPosts(snapshot){
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

            setPublis([])
            setPublis( publis => [...publis, ...lista])
            console.log(lista)

        }else{
            toast.warning('Nenhuma noticia encontrada!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            });
        }
    }


    async function updateUsers(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = [];

            snapshot.forEach( doc => {
                lista.push({
                    Id: doc.id,
                    NomeUsuario: doc.data().NomeUsuario
                })
            })

            setAutorUnico( users => [...users, ...lista])
        }
    }

    function openModal(){
      setModalPost(!modalPost)
    }

    function openFilterModal(){
        setModalFilter(!modalFilter)
    }

    function handleUF(e){
        setEstado(e);
        setSelected(e);
        console.log(estado)
        console.log(selected)
    }

    async function handleLoadPosts(e){
        e.preventDefault();

        let post = query(postsRef, 
            and( 
                where( 'Topico', '==', topico ), 
                where( 'Estado', '==', estado ),
                where( 'Municipio', '==', municipio ),
                where( 'Status', '==', status ),
                where( 'Autor', '==', empresa)
                ),
                orderBy('Data', order)
                )
            

        await getDocs(post)
        .then((snapshot)=>{
            updateNewPosts(snapshot);
        })
        .catch((err)=>{
            console.log(err);
        })



    };



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
                    <form onSubmit={handleLoadPosts}>
                        <div className='filter'>
                            <div className='button-filter'>
                                <button className='icon-filter-button' onClick={openFilterModal}>
                                    <FiFilter size='1.5em' color='#fff'/>
                                    <span>Clique para abrir os filtros</span>
                                </button>
                            </div>
                            <div>
                                <label>Ordernado por:</label>
                                <select onChange={(e) => setOrder(e.target.value)} value={order}>
                                    <option className='option' value='desc'>Mais recentes</option>
                                    <option className='option' value='asc'>Menos recentes</option>
                                </select>
                            </div>
                            <div>
                                <label>Tópico:</label>
                                <select onChange={(e) => setTopico(e.target.value)} value={topico}>
                                    <option className='option-modal'>--</option>
                                    <option className='option-modal'>Tecnologia</option>
                                    <option className='option-modal'>Saúde</option>
                                    <option className='option-modal'>Esportes</option>
                                    <option className='option-modal'>Política</option>
                                    <option className='option-modal'>Economia</option>
                                    <option className='option-modal'>Entretenimento</option>
                                    <option className='option-modal'>Ciência</option>
                                    <option className='option-modal'>Educação</option>
                                    <option className='option-modal'>Meio Ambiente</option>
                                    <option className='option-modal'>Cultura</option>
                                    <option className='option-modal'>Crime</option>
                                    <option className='option-modal'>Moda</option>
                                    <option className='option-modal'>Negócios</option>
                                    <option className='option-modal'>Viagem</option>
                                    <option className='option-modal'>Outros</option>
                                </select>
                            </div>
                            <div>
                                <label>Estado:</label>
                                <select onChange={(e) => handleUF(e.target.value)} value={estado}>
                                <option className='option-modal'>--</option>
                                {locais.map((locais, index)=> (
                                    <option key={index} className='option-modal'>{locais.sigla}</option>
                                ))}
                                </select>
                            </div>
                            <div>
                                <label>Municipio:</label>
                                <select value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
                                    <option className='option-modal'>--</option>
                                {cidades.map((cidades, index)=> (
                                    <option key={index} className='option-modal'>{cidades.nome}</option>
                                ))}
                                </select>
                            </div>
                            <div>
                                <label>Status:</label>
                                <select onChange={(e) => setStatus(e.target.value)} value={status}>
                                    <option className='option-modal'>--</option>
                                    <option className='option-modal'>Verificada</option>
                                    <option className='option-modal'>Não verificada</option>
                                </select>
                            </div>
                            <div>
                                <label>Empresa:</label>
                                <select onChange={(e) => setEmpresa(e.target.value)} value={empresa}>
                                <option className='option-modal'>--</option>
                                {autorUnico.map((itens, index)=> (
                                    <option className='option-modal' key={index}>{itens.NomeUsuario}</option>
                                ))}
                                </select>
                            </div>
                            <button type='submit' className='icon-filter-button-search'>
                                <BiSearchAlt size='1.8em' color='#fff'/>
                            </button>
                        </div>
                    </form>
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
                                    item.Link[0] > 1? (
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
                                </div>
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