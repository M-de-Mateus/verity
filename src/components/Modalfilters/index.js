import './modalfilters.css';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Modalfilters({ close }){
    return(
        <div className='filter-modal-container'>
            <div className='button-modal-container'>
                <div>
                    <button onClick={ close }>
                        <AiOutlineCloseCircle size='3em' className='icon-close'/>
                    </button>   
                </div>
                <div className='filtermodal'>
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
                    <button className='icon-filter-button-search-modal'>
                        <BiSearchAlt size='1.8em' color='#fff'/>
                    </button>
                </div>
            </div>
        </div>
    )
};