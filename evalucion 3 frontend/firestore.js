// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
//funciones de firestore
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de su app
const firebaseConfig = {
    apiKey: "AIzaSyBhpzWbcKDg9Ct0vITiEwf8CO89wzkxN5w",
    authDomain: "copaamerica-b14b8.firebaseapp.com",
    projectId: "copaamerica-b14b8",
    storageBucket: "copaamerica-b14b8.appspot.com",
    messagingSenderId: "599698163125",
    appId: "1:599698163125:web:5a18aa40d259708da645fc"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getFirestore es la función que permite trae la base de datos para su utilización
const db = getFirestore(app);
//save es una función creada que invoca la función de firestore para gaurdar
export const save = (emp) => {
    //addDoc es la función de firestore que guardar un documento en una colección
    //collection es una función de firestore que permite acceder a una colección de la base de datos 
    addDoc(collection(db, 'equipos'), emp)
}
//función para cargar todos los documentos de la colección
export const getAll = (data) => {
    //onSnapshot es una función de firestore que permite cargar los documentos en tiempo real
    onSnapshot(collection(db, 'equipos'), data)
}

//función remove permite eliminar un documento según su id
export const remove = (id) => {
    //doc es la función de firestore que busca un documento según su id
    //deleteDoc es la función de firestore que permite eliminar el documento
    deleteDoc(doc(db, 'equipos', id))
}

//selectOne es una función que permite seleccionar un documento
//getDoc es la función de firestore que permite retornar un documento seleccionado
export const selectOne = (id) => getDoc(doc(db, 'equipos', id))
//FALTA FUNCIÓN EDITAR
export const update = (id,emp) =>{
    //updateDoc es una función de firestore que permite editar un documento en una colección
    updateDoc(doc(db,'equipos',id),emp)
}