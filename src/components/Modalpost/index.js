import './modalpost.css';
import { useState, useEffect } from 'react';
import avatar from '../../assets/avatar.png';
import { GrFormClose } from 'react-icons/gr';
import { MdVideoLibrary, MdImage } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import api from '../../services/api';



export default function Modalpost({close, user}){
    const [ locais, setLocais ] = useState([]);
    const [ cidades, setCidades ] = useState([]);
    const [ selected, setSelected ] = useState('AC')

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

    return(
        <div className='modal-post'>
            <div className='modal-post-container'>
                <div className='modal-post-container-header'>
                    <div className='modal-post-container-title'>
                        <h2>Criar publicação</h2>
                    </div>
                    <div className='modal-post-container-close'>
                        <button onClick={ close }>
                            <GrFormClose size={'2em'}/>
                        </button>   
                    </div>
                </div>
                <hr/>
                <div className='modal-post-container-user-info'>
                    <img src={user.FotoPerfil === null ? avatar : user.FotoPerfil} alt='user'/>
                    <span><strong>{user.NomeUsuario}</strong></span>
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
                            <span>Nivel da noticia</span>
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
                        <div className='modal-post-area-form-anexo'>
                                <span>Anexe arquivos que comprovem sua noticia</span>
                                <button><FiPaperclip color='#0395FF' size={'1.3em'}/></button>
                        </div>
                        <div className='modal-post-area-form-filters'>
                            <div>
                                <label>Tópico: </label>
                                <select>
                                    <option value="0">---</option> 
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
                                <select>
                                {cidades.map((cidades)=> (
                                        <option key={cidades.id} className='option-modal'>{cidades.nome}</option>
                                    ))}
                                </select>
                            </div>                    
                        </div>
                        <div className='modal-post-area-form-filters'>
                            <button className='modal-post-publi'>Publicar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}