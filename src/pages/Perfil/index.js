import './perfil.css';
import Header from '../../components/Header';
import { useContext, useState, useEffect } from 'react';
import { toast } from "react-toastify";
import AutolinkerWrapper from 'react-autolinker-wrapper';
import { ReactTinyLink } from 'react-tiny-link'
import defaultMedia from '../../assets/default.jpg';
import cover from '../../assets/pravda.png';
import coverpf from '../../assets/coverDefault.png';
import avatar from '../../assets/avatar.png'
import { AiFillLike, AiOutlineFileSearch} from 'react-icons/ai';
import { MdOutlineModeComment, MdOutlineShare, MdHouse, MdModeComment } from 'react-icons/md';
import { TiCamera, TiWarning } from 'react-icons/ti';
import { GoVerified } from 'react-icons/go';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { ImNewspaper } from 'react-icons/im';
import { db, storage } from '../../services/firebaseconnection';
import { doc, updateDoc } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { AuthContext } from '../../contexts/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';



export default function Perfil(){

    const { user, storageUser, setUser } = useContext(AuthContext);

    const [ avatarUrl, setAvatarUrl ] = useState( user && user.FotoPerfil);

    const [ publis, setPublis ] = useState([]);

    const postsRef = collection(db, 'posts');
    const posts = getDocs(query(postsRef, where( 'Uid', '==', user.uid ), orderBy('Data', 'desc')));

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
                    Conteudo: doc.data().Conteudo,
                    Autor: doc.data().Autor,
                    FotoPerfil: doc.data().FotoPerfil,
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

    function handleFile(e){
        if(e.target.files[0] !== null){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setAvatarUrl(URL.createObjectURL(image));
                handleUpload(image)          
            }else{
                toast.warning('Envie uma foto no formato PNG ou JPEG!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: "",
                    theme: "colored",
                });
                return;
            }
            
        }else{
            toast.warning('Envie uma foto no formato PNG ou JPEG!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            })
        } 
    }

    async function handleUpload(image){
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${image.name}`)

        const uploadTask = uploadBytes(uploadRef, image)
        .then((snapshot)=>{
            
            getDownloadURL(snapshot.ref)
            .then( async (downloadUrl) =>{
                let urlFoto = downloadUrl;

                if(user.Pessoa === "Fisica"){
                    const docRef = doc(db, "usersCPF", user.uid)
                    await updateDoc(docRef, {
                        FotoPerfil: urlFoto 
                    })
                    .then(()=>{
                        let data = {
                            ...user,
                            FotoPerfil: urlFoto
                        }

                        setUser(data);
                        storageUser(data);
                        toast.success('Foto atualizada com sucesso!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress:"",
                            theme: "colored",
                            });
                    })
                }else{
                    const docRef = doc(db, "usersCNPJ", user.uid)
                    await updateDoc(docRef, {
                        FotoPerfil: urlFoto 
                    })
                    .then(()=>{
                        let data = {
                            ...user,
                            FotoPerfil: urlFoto
                        }

                        setUser(data);
                        storageUser(data);
                        toast.success('Foto atualizada com sucesso!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress:"",
                            theme: "colored",
                        });
                    })
                }
            })
        })
    }

    return(
        <div>
            <Header/>
            <div className='content-profile'>
                <div className='user-profile-cover'>
                    <div className='profile-cover'>
                        {user.Pessoa === "Juridica" ?
                        (<img src={user.FotoCapa === null ? cover : user.FotoCapa} alt='capa'/>) :
                        (<img src={user.FotoCapa === null ? coverpf : user.FotoCapa} alt='capa'/>)}
                    </div>
                    <div className='profile-info'>
                            <div className='profile-image-container'>
                                <div className='profile-user-image'>
                                    {avatarUrl === null ? (<img src={avatar} alt='capa'/>)
                                    :  (<img src={user.FotoPerfil} alt='capa'/>
                                    )}               
                                </div>
                                <form className='profile-user-form-image'>
                                    <label>  
                                            <input type='file' onChange={handleFile}  accept='image/*'/>
                                    </label>
                                </form>
                            </div>
                        <div className='profile-user-name'>
                            <div>
                                <h3>{user.NomeUsuario} {user.StatusVerificação === "Não verificada" ? "" : 
                                <GoVerified size='.7em'/>}</h3>
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
                                <div className='bio'>{user.Biografia === null ? 'Escreva algo sobre você...'
                                : user.Biografia}</div>  
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
                        {user.Pessoa === "Juridica" ? 
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
                        : ""}
                        {user.Pessoa === "Juridica" ? 
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
                                    <p>15/01/2022 - <strong>Lula financia cuba</strong> - Noticia falsa.</p>
                                </div>
                            </div>
                            <hr color='#e9e9e9'/>
                        </div>
                        : ""}
                    </div>
                    
                    <div className='user-profile-area-column'>
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
                </div>
            </div>
        </div>
    )
}