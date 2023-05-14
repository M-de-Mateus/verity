import './modalpost.css';
import { useState, useEffect} from 'react';
import avatar from '../../assets/avatar.png';
import { GrFormClose } from 'react-icons/gr';
import { MdImage } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import api from '../../services/api';
import { ReactTinyLink } from 'react-tiny-link';
import defaultMedia from '../../assets/default.jpg';
import { toast } from "react-toastify";
import { db, storage } from '../../services/firebaseconnection';
import { addDoc, collection } from 'firebase/firestore'; 
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


export default function Modalpost({close, user}){


    const [ locais, setLocais ] = useState([]);
    const [ cidades, setCidades ] = useState([]);
    const [ selected, setSelected ] = useState('AC')
    const [ text, setText ] = useState('');
    const [ hasLink, setHasLink ] = useState(false);
    const [ link, setLink ] = useState([]);
    const [ fotoUrl, setFotoUrl ] = useState([]);
    const [ nivel, setNivel ] = useState(null);
    const [ topico, setTopico ] = useState('Tecnologia');
    const [ municipio, setMunicipio ] = useState('Acrelândia');
    const [ anexo, setAnexo ] = useState([]);
    const [ fotoLink, setFotoLink ] = useState('');
    const [ uploadImage, setUploadImage ] = useState(false);
    const [ uploadArquivos, setUploadArquivos ] = useState(false);

   function handleFile(e){
        if(e.target.files[0] !== null){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setFotoUrl(URL.createObjectURL(image)); 
                handleUpload(image);      
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


    async function handleFileAnexo(e){
        setUploadArquivos(true);
        if(e.target.files[0] !== null){
            const arquivo = e.target.files;
            setUploadArquivos(true);

            if(arquivo){
                await uploadAnexo(arquivo);
                setUploadArquivos(false);
            }else{
                setUploadArquivos(false);
                toast.warning('Envie um arquivo válido!', {
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
            setUploadArquivos(false);
            toast.warning('Envie um arquivo válido!', {
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

        setUploadArquivos(false);
    }



    function closeModal(){
        if(fotoUrl){
            setFotoUrl([])
        }
        close(false)
        setHasLink(false)
    }

    function limpaImagem(){       
        const clearedInput = document.querySelector('input[type="file"]');
            if (clearedInput) {
            clearedInput.value = '';
            setFotoUrl([]);
        }
    }

    async function handleUpload(image){
        const currentUid = user.uid;

        setUploadImage(true);

        const uploadRef = ref(storage, `imagesPosts/${currentUid}/${image.name}`)

        await uploadBytes(uploadRef, image)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then(async (downloadUrl) => {
                await setFotoLink(downloadUrl)
                setUploadImage(false);
            })
            .catch((err) => {
                console.log(err)
                setUploadImage(false);
            })
        })
    
    }


    async function uploadAnexo(anexos){
        const currentUid = user.uid;

        for (const i of anexos) {
            const uploadRef = ref(storage, `anexosPosts/${currentUid}/${i.name}`)
            const uploadTask = uploadBytesResumable(uploadRef, i);
        
            // Cria um elemento "progress" para exibir a barra de progresso
            const progressBar = document.createElement('progress');
            progressBar.id = `anexo-progress-${i.name}`;
            progressBar.max = 100;
            progressBar.value = 0;
        
            // Adiciona a barra de progresso à página
            const progressBarContainer = document.getElementById('progress-bar-container');
            progressBarContainer.appendChild(progressBar);
        
            // Monitora o evento upload_progress para atualizar a barra de progresso
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.value = progress;
            }, (error) => {
                console.log(error);
            }, () => {
                // Quando o upload é concluído, obtém a URL de download e adiciona à lista
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadUrl) => {
                await anexo.push(downloadUrl)
                console.log(anexo)
                })
                .catch((err) => {
                console.log(err)
                })
                // Remove a barra de progresso da página
                progressBar.parentNode.removeChild(progressBar);
            })
        }

        
        
    }


    function handleTextChange(e){
        const regex = /(https?:\/\/[^\s]+)/g;
        // Expressão regular para encontrar links
        const links = e.match(regex) || [];
        // Faz o match dos links usando a expressão regular e armazena em um array
        const outputLinks = links.map((url) => {
          return setLink([...link, url])
        });
        setText(e);
        setHasLink(outputLinks.length > 0);

      };
    

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

    function handleUF(e){
        setSelected(e)
    }

    function handleOptionChange(e){
        setNivel(e.target.value)
    }

    function handleChangeSelectTopico(e){
        setTopico(e.target.value)
    }

    function handleChangeSelectMunicipio(e){
        setMunicipio(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault();
      
        await addDoc(collection(db, 'posts'), {      
          Uid: user.uid,
          Conteudo: text,
          Data: new Date(),
          IdComentarios: null,
          Topico: topico,
          Estado: selected,
          Municipio: municipio,
          Nivel: nivel, 
          Anexos: anexo,
          Imagem: fotoLink,
          Status: "Não verificada"
        })
        .then(()=>{
            closeModal()
        })
        .catch((err)=>{
            console.log(err);
        });
      }

    return(
        <div className='modal-post'>
            <div className='modal-post-container'>
                <div className='modal-post-container-header'>
                    <div className='modal-post-container-title'>
                        <h2>Criar publicação</h2>
                    </div>
                    <div className='modal-post-container-close'>
                        <button onClick={closeModal}>
                            <GrFormClose size={'2em'}/>
                        </button>   
                    </div>
                </div>
                <hr/>
                <div className='modal-dinamic-division'>
                    <div className='modal-post-container-user-info'>
                        <img src={user.FotoPerfil === null ? avatar : user.FotoPerfil} alt='user'/>
                        <span><strong>{user.NomeUsuario}</strong></span>
                    </div>
                    <div className='modal-post-area'>
                        <form className='modal-post-area-form' onSubmit={handleSubmit}> 
                            <textarea type='text' onChange={(e) => handleTextChange(e.target.value)}
                             placeholder='O que vamos noticiar hoje?'/>
                            <div>
                            {hasLink &&  fotoUrl.length === 0  ? 
                            <ReactTinyLink
                                cardSize="large"
                                showGraphic={true}
                                maxLine={2}
                                minLine={1}
                                loadSecureUrl={true}
                                defaultMedia={defaultMedia}
                                url={link[0]}
                                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3 Edge/16.16299"
                                /> : ""}

                            {fotoUrl.length > 0 ?
                            (<><div className='feed-image-notice'>
                                        <img src={fotoUrl} alt='media' />
                                    </div>
                                    <button className='close-image-button' 
                                    onClick={limpaImagem}>
                                        <GrFormClose size={'2em'} />
                                    </button></>              
                            ) : ""}
                            </div>
                            <div className='modal-post-area-form-media'>
                                <span>Adicione à sua publicação</span>
                                <span><MdImage color='#30706f' size={'1.3em'}/></span>
                                <input type='file' onChange={handleFile}  accept='image/*'></input>
                            </div>
                            <div className='modal-post-area-form-ratio'>
                                <span>Nivel da noticia</span>
                                <ul class="ratio-options">
                                    <li class="option-modal low">
                                        <input name="levels" type="radio" id="low" value="Baixo"
                                        onChange={handleOptionChange}
                                        checked={nivel === "Baixo"}/>
                                        <label for="low">Baixo</label>
                                    </li>

                                    <li class="option-modal medium">
                                        <input name="levels" type="radio" id="medium" value="Médio"
                                        onChange={handleOptionChange}
                                        checked={nivel === "Médio"}/>
                                        <label for="medium">Médio</label>
                                    </li>

                                    <li class="option-modal high">
                                        <input name="levels" type="radio" id="high" value="Alto"
                                        onChange={handleOptionChange}
                                        checked={nivel === "Alto"}/>
                                        <label for="high">Alto</label>
                                    </li>
                                </ul>
                            </div>
                            <div className='modal-post-area-form-anexo'>
                                    <span>Anexe arquivos que comprovem sua noticia</span>
                                    <span><FiPaperclip color='#0395FF' size={'1.2em'}/></span>
                                    <input type='file' onChange={handleFileAnexo} multiple="multiple"></input>
                                    <div id="progress-bar-container"></div>
                            </div>
                            <div className='modal-post-area-form-filters'>
                                <div>
                                    <label>Tópico: </label>
                                    <select value={topico} onChange={handleChangeSelectTopico}>
                                        <option>Tecnologia</option>
                                        <option>Saúde</option>
                                        <option>Esportes</option>
                                        <option>Política</option>
                                        <option>Economia</option>
                                        <option>Entretenimento</option>
                                        <option>Ciência</option>
                                        <option>Educação</option>
                                        <option>Meio Ambiente</option>
                                        <option>Cultura</option>
                                        <option>Crime</option>
                                        <option>Moda</option>
                                        <option>Negócios</option>
                                        <option>Viagem</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Estado: </label>
                                    <select onChange={(e)=> handleUF(e.target.value)}>
                                        {locais.map((locais)=> (
                                            <option key={locais.id} className='option-modal'>{locais.sigla}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Municipio: </label>
                                    <select value={municipio} onChange={handleChangeSelectMunicipio}>
                                    {cidades.map((cidades)=> (
                                            <option key={cidades.id} className='option-modal'>{cidades.nome}</option>
                                        ))}
                                    </select>
                                </div>                    
                            </div>
                            <div className='modal-post-area-form-filters'>
                                {nivel === null ? 
                                    (<button type='submit' className='modal-post-publi-disable' disabled> 
                                    <abbr title='Selecione um nível para sua noticia!'> 
                                        {uploadArquivos || uploadImage ? 'Carregando...' : 'Publicar'}
                                    </abbr>
                                    </button>) : 
                                    (((nivel === 'Médio' || nivel === 'Alto') && anexo.length > 0) && uploadArquivos === false && uploadImage === false ?
                                    (<button type='submit' className='modal-post-publi'> 
                                        {uploadArquivos || uploadImage ? 'Carregando...' : 'Publicar'}
                                    </button>) :
                                    (nivel === 'Baixo' && (uploadArquivos === false && uploadImage === false) ?
                                    <button type='submit' className='modal-post-publi'> 
                                        {uploadArquivos || uploadImage ? 'Carregando...' : 'Publicar'}
                                    </button>
                                        :
                                    <button type='submit' className='modal-post-publi-disable' disabled> 
                                    <abbr title='Anexe uma prova em sua noticia para publicá-la!'> 
                                        {uploadArquivos || uploadImage ? 'Carregando...' : 'Publicar'}
                                    </abbr>
                                    </button>))
                                }                                    
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        </div>
    )
}