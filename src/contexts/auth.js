import { useState, createContext } from 'react';
import { auth, db } from '../services/firebaseconnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext({});

function AuthProvider( {children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate('');

    function getData(){
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        return dia + '/' + mes + '/' + ano;
    }

    async function singInCNPJ(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "usersCNPJ", uid);
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                name: docSnap.data().NomeUsuario,
                email: value.user.email,
                biografia: docSnap.data().biografia,
                CNPJ: docSnap.data().CNPJ,
                DataCadastro: getData(),
                Rua: docSnap.data().Rua,
                Numero: docSnap.data().Numero,
                Bairro: docSnap.data().Bairro,
                Cidade: docSnap.data().Cidade,
                CEP: docSnap.data().CEP,
                Estado: docSnap.data().Estado,
                FotoCapa: docSnap.data().FotoCapa,
                FotoPerfil: docSnap.data().FotoPerfil,
                NomeFantasia: docSnap.data().NomeFantasia,
                Pais: docSnap.data().Pais,
                StatusEmpresa: docSnap.data().StatusEmpresa,
                StatusVerificação: docSnap.data().StatusVerificação,
                Telefone: docSnap.data().Telefone,
                Tipo: docSnap.data().Tipo,
            }

            setUser(data);
            storageUser(data);
            console.log(data)
            setLoadingAuth(false);
            navigate('/home');
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function singUpCNPJ(email, password, name, cnpj, nomeFantasia, tipo, cep, rua, numero, bairro,
        cidade, estado, pais, telefone ){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "usersCNPJ", uid ), {
                biografia: "",
                CNPJ: cnpj,
                DataCadastro: getData(),
                Rua: rua,
                Numero: numero,
                Bairro: bairro,
                Cidade: cidade,
                CEP: cep,
                Estado: estado,
                FotoCapa: "",
                FotoPerfil: "",
                NomeFantasia: nomeFantasia,
                NomeUsuario: name,
                Pais: pais,
                StatusEmpresa:"100",
                StatusVerificação:"Não verificada",
                Telefone: telefone,
                Tipo: tipo,
                Email: email
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    biografia: "",
                    CNPJ: cnpj,
                    DataCadastro: getData(),
                    Rua: rua,
                    Numero: numero,
                    Bairro: bairro,
                    Cidade: cidade,
                    CEP: cep,
                    Estado: estado,
                    FotoCapa: null,
                    FotoPerfil: null,
                    NomeFantasia: nomeFantasia,
                    NomeUsuario: name,
                    Pais: pais,
                    StatusEmpresa:"100",
                    StatusVerificação:"Não verificada",
                    Telefone: telefone,
                    Tipo: tipo,
                };
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                navigate('/home');
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('@userData', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider
            value={{
                singned: !!user,
                user,
                singInCNPJ,
                singUpCNPJ,
                loadingAuth  
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;