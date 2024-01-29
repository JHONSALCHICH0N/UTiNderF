import React, { useEffect, useState } from 'react';
import '../css/MenuAdmin.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions/functions';

const MenuAdmin = () => {
    const url = 'https://social-network-utn-production.up.railway.app/auth/users';
    const urla ='https://social-network-utn-production.up.railway.app/auth/register';
    const urlb ='https://social-network-utn-production.up.railway.app/auth/update';
    const urlc ='https://social-network-utn-production.up.railway.app/auth/delete';

    const [users, setusers] = useState([]);
    const [id, setId] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [faculty, setfaculty] = useState('');
    const [profile, setprofile] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getusers();
    }, []);

    const getusers = async () => {
        try {
            const respuesta = await axios.get(url);
            setusers(respuesta.data.users); // Accede al array de usuarios
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }

    const openModal = (op, id, name, email, password, username, faculty) => {
        setId('');
        setname('');
        setemail('');
        setusername('');
        setpassword('');
        setfaculty('');
        setOperation(op);
        if (op == 1) {
            setTitle('Registar Usuario');

        }
        else if (op == 2) {
            setTitle('Editar usuario');
            setId(id);
            setname(name);
            setemail(email);
            setusername(username);
            setpassword(password);
            setfaculty(faculty);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }

    const validar = () =>{
        var parametros;
        var metodo;
        if(name.trim() === ''){
            show_alerta('Escribe el nombre','warning');
        }
        else if(email.trim() === ''){
            show_alerta('Escribe el email','warning');
        }
        else if(username.trim() === ''){
            show_alerta('Escribe el user','warning');
        }
        else if(password.trim() === ''){
            show_alerta('Escribe el password','warning');
        }
        else if(faculty.trim() === ''){
            show_alerta('Escribe el facultad','warning');
        }
        else{
            if(operation == 1){
                parametros={name:name.trim(),email:email.trim(),username:username.trim(),password:password.trim(),faculty:faculty.trim()};
                metodo='POST';
                enviarSolicitudA(metodo,parametros);
            }
            else{
                parametros={id:id,name:name.trim(),email:email.trim(),username:username.trim(),password:password.trim(),faculty:faculty.trim()};
                metodo='PUT';
                enviarSolicitudB(metodo,parametros);
            }
            
        }
    }

    const enviarSolicitudA = async(metodo,parametros) => {
        await axios ({ method:metodo, url:urla, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if(tipo === 'ok'){
                document.getElementById('btnCerrar').click();
                getusers();
            }
        })
        .catch(function(error){
            show_alerta('Error de solicitud','error');
            console.log(error);
        })
    }
    const enviarSolicitudB = async(metodo,parametros) => {
        await axios ({ method:metodo, url:urlb, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getusers();
            }
        })
        .catch(function(error){
            show_alerta('Error de solicitud','error');
            console.log(error);
        })
    }

    const enviarSolicitudC = async(metodo,parametros) => {
        await axios ({ method:metodo, url:urlc, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getusers();
            }
        })
        .catch(function(error){
            show_alerta('Error de solicitud','error');
            console.log(error);
        })
    }

    const deleteuser=(id,name) =>{
        const MySwal =withReactContent(Swal);
        MySwal.fire({
            title:'Seguro de eliminar el producto'+name+'?',
            icon:'question',text:'No hay marcha atras',
            showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                enviarSolicitudC('DELETE',{id:id});
            }
            else{
                show_alerta('El user NO fue eliminado','info');
            }
        });
    }


    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>#</th><th>NOMBRE</th><th>EMAIL</th><th>USUARIO</th><th>FACULTAD</th><th></th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {users.map((user, i) => (
                                        <tr key={user.id}>
                                            <td>{(i + 1)}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.profile.username}</td>
                                            <td>{user.profile.faculty}</td>

                                            <td>
                                                <button onClick={() => openModal(2,user.id,user.name ,user.email ,user.profile.username ,user.password ,user.profile.faculty)} 
                                                className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={()=>deleteuser(user.id,user.name)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='nombre' className='form-controls' placeholder='Nombre' value={name}
                                    onChange={(e) => setname(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='email' className='form-controls' placeholder='Email' value={email}
                                    onChange={(e) => setemail(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='username' className='form-controls' placeholder='Usuario' value={username}
                                    onChange={(e) => setusername(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='password' className='form-controls' placeholder='Contraseña' value={password}
                                    onChange={(e) => setpassword(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='faculty' className='form-controls' placeholder='Facultad' value={faculty}
                                    onChange={(e) => setfaculty(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

    return (
        <div>

        </div>
    )
}

export default MenuAdmin