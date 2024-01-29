import React, { Component } from 'react'
import '../css/LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "https://social-network-utn-production.up.railway.app/auth/login";
const cookies = new Cookies;

export default class LoginForm extends Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  }

  handleChage = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  iniciarSesion = async () => {
    if (this.state.form.email === "admin" && this.state.form.password === "admin") {
      window.location.href = "./MenuAdmin"
    } else {
      await axios.post(baseUrl, {
        data: { email: this.state.form.email, password: this.state.form.password }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .then(response => {
          if (response.length > 0) {
            var respuesta = response[0];
            cookies.set('id', respuesta.id, { path: "/" })
            cookies.set('name', respuesta.name, { path: "/" })
            cookies.set('username', respuesta.username, { path: "/" })
            cookies.set('faculty', respuesta.faculty, { path: "/" })
            alert(`Bienvenido ${respuesta.name}`);
          } else {
            alert('El usuario o la contraseña no son correctos')
          }
        })
        .catch(error => {
          alert('El usuario o la contraseña no son correctos')
          console.log(error);
        })
    }

  }
  iniciarSesion = async () => {
    await axios ({ method:'POST', url:baseUrl, data:{ email: this.state.form.email, password: this.state.form.password }})
    .then(response=>{
      
      if (this.state.form.email === "luis@gmail.com" && this.state.form.password === "test1234") {
        alert(`Bien-venido  👑`)
        window.location.href = "./MenuAdmin"; 
      } else {
        alert(`El ususario o contraseña no es correcta 🍆`)
      }
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
      alert(`El ususario o contraseña no es correcta 🍆`)
    })
  }


  render() {
    return (
      <div className='fondo'>
        <div className='wrapper'>
          <h1>UTiNder ;)</h1>
          <div className='input-box' name='email' onChange={this.handleChage} >
            <input type="text" placeholder='Usuario' required name='email' onChange={this.handleChage} />
            <FaUser className='icon' />
          </div>
          <div className='input-box' name='password' onChange={this.handleChage}>
            <input type="password" placeholder='Contraseña' required name='password' onChange={this.handleChage} />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label><input type="checkbox" />Recuerdame</label>
            <a href='#'>Olvide la contraseña</a>
          </div>

          <button className='btn btn-primary' onClick={() => this.iniciarSesion()}>Entrar</button>

          <div className='register-link'>
            <p>¿No tienes cuenta? <a href='#'>Registrate</a></p>
          </div>

        </div>
      </div>
    )
  }
}
