import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseconnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export const AuthContext = createContext({});

function AuthProvider( {children}){
    const [ user, setUser ] = useState(null);
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loading, setLoading] = useState(true);

    const navigate = useNavigate('');

    useEffect(()=>{
        async function loadUser(){
            const storageUser = localStorage.getItem('@userData');

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }

            setLoading(false);
        }

        loadUser();
    }, [])

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
                NomeUsuario: docSnap.data().NomeUsuario,
                Email: value.user.email,
                Biografia: docSnap.data().Biografia,
                CNPJ: docSnap.data().CNPJ,
                DataCadastro: docSnap.data().DataCadastro,
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
                Pessoa: docSnap.data().Pessoa
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            navigate('/home');
            toast.success('Bem-vindo(a) de volta!', {
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
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Algo deu errado, tente novamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            });
        })
    }

    async function singUpCNPJ(email, password, name, cnpj, nomeFantasia, tipo, cep, rua, numero, bairro,
        cidade, estado, pais, telefone ){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "usersCNPJ", uid ), {
                Biografia: null,
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
                Email: email,
                Pessoa: "Juridica"
            })
            .then(() => {
                let data = {
                    uid: uid,
                    NomeUsuario: name,
                    Email: value.user.email,
                    Biografia: null,
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
                    Pais: pais,
                    StatusEmpresa:"100",
                    StatusVerificação:"Não verificada",
                    Telefone: telefone,
                    Tipo: tipo,
                    Pessoa: "Juridica"
                };
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                navigate('/home');
                toast.success('Bem-vindo(a)!', {
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
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Algo deu errado, tente novamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            });
        })
    }

    async function singInCPF(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "usersCPF", uid);
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                NomeUsuario: docSnap.data().NomeUsuario,
                Email: value.user.email,
                Biografia: docSnap.data().Biografia,
                CPF: docSnap.data().CPF,
                DataCadastro: docSnap.data().DataCadastro,
                FotoCapa: docSnap.data().FotoCapa,
                FotoPerfil: docSnap.data().FotoPerfil,
                StatusVerificação: docSnap.data().StatusVerificação,
                Pessoa: docSnap.data().Pessoa
            }

            setUser(data);
            storageUser(data);
            console.log(data)
            setLoadingAuth(false);
            navigate('/home');
            toast.success('Bem-vindo(a) de volta!', {
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
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Algo deu errado, tente novamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            });
        })
    }

    async function singUpCPF(email, password, name, cpf ){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "usersCPF", uid ), {
                Biografia: null,
                CPF: cpf,
                DataCadastro: getData(),
                FotoCapa: null,
                FotoPerfil: null,
                NomeUsuario: name,
                StatusVerificação:"Não verificado",
                Email: email,
                Pessoa: "Fisica"
            })
            .then(() => {
                let data = {
                    uid: uid,
                    Biografia: null,
                    CPF: cpf,
                    DataCadastro: getData(),
                    FotoCapa: null,
                    FotoPerfil: null,
                    NomeUsuario: name,
                    StatusVerificação:"Não verificado",
                    Email: value.user.email,
                    Pessoa: "Fisica"
                };
                
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                navigate('/home');
                toast.success('Bem-vindo(a)!', {
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
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Algo deu errado, tente novamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: "",
                theme: "colored",
            });
        })
    }

    function storageUser(data){
        localStorage.setItem('@userData', JSON.stringify(data))
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@userData');
        setUser(null);
    }



    return(
        <AuthContext.Provider
            value={{
                singned: !!user,
                user,
                singInCNPJ,
                singUpCNPJ,
                singInCPF,
                singUpCPF,
                logout,
                loadingAuth,
                loading, 
                storageUser,
                setUser  
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;