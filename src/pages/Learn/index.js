import './learn.css';
import Header from '../../components/Header';
import { GiGraduateCap } from 'react-icons/gi';
import { ImNewspaper } from 'react-icons/im';
import { TbMessage2 } from 'react-icons/tb';
import { TbCode } from 'react-icons/tb';
import { GiCage } from 'react-icons/gi';
import { BsCalendar3 } from 'react-icons/bs';
import { TbCross } from 'react-icons/tb';


export default function Learn(){
    return(
        <div>
            <Header/>
            <div className='content-learn'>
                <div className='content-banner'>
                    <div className='content-banner-logo'>
                        <GiGraduateCap color='#30706f'/>
                    </div>
                    <div className='content-banner-text'>
                        <h1>Bem-vindos ao <strong id='text-font-modified'>Verity Learn</strong>!</h1>
                        <div className='content-banner-text-area'>
                            <div>
                            O Verity Learn é uma area onde podemos aprender mais sobre Fake News. Aqui você encontrará artigos sobre como surgem, como se propagam e como identifica-las!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <ImNewspaper color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>O que são Fake News?</h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>Como surgiram as Fake News?</li>
                            <li>Qual o impacto das noticias falsas na sociedade?</li>
                            <li>Qual o plano do governo para lidar com essas noticias?</li>
                        </ul>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <TbMessage2 color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>Whatsapp x Telegram: Qual ferramenta
                            propaga mais fake news? </h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>Quais medidas são adotadas em cada plataforma para evitar as fake news?</li>
                            <li>Como reconhecer uma noticia falsa nessas plataformas?</li>
                            <li>Como denunciar grupos que propagam fake news?</li>
                        </ul>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <TbCode color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>Edição de HTML: Como essa técnica é usada para dar veracidade as Fake News? </h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>O que HTML?</li>
                            <li>Edições de HTML modificam o site permanentemente?</li>
                            <li>Como descobrir se a página foi editada?</li>
                        </ul>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <GiCage color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>Fake News é crime? Saiba o que diz a lei sobre isso.</h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>O que diz a lei sobre noticias falsas?</li>
                            <li>Sou punido se compartilhar a noticia?</li>
                            <li>Quais são as punições para esse tipo de crime?</li>
                        </ul>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <BsCalendar3 color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>Cronologia: Saiba a importancia das datas das noticias.</h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>Por que as datas são tão importantes?</li>
                            <li>Por que é importante verificar quando a noticia foi publicada?</li>
                            <li>Como notcias verdadeiras se tornam fake news?</li>
                        </ul>
                    </div>
                </div>
                <div className='learn-articles'>
                    <div className='learn-articles-logo'>
                        <TbCross color='#fff'/>
                    </div>
                    <div className='learn-articles-infos'>
                        <h3>Tragédia: As vezes que noticias falsas mataram.</h3>
                        <h5>Nesse artigo:</h5>
                        <ul>
                            <li>Qual o real perigo de uma fake news?</li>
                            <li>Entrevista real com uma vitima de fake news.</li>
                            <li>Por que não devemos fazer justiça com as proprias mãos?</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}