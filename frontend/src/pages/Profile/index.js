import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'


function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const OngName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorizantion: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncidents(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorizantion: ongId,
                }
            })

            setIncidents(incidents.filter(incidents => incidents.id !== id))
        } catch (err) {
            alert('Erro ao tentar deletar o caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }
    
    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt= 'Be the Hero' />
                <span>Bem vinda, {OngName}</span>

                <Link className='button' to='/incident/new'>Cadastrar novo caso</Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#e02041' />
                </button> 
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncidents(incidents.id)} type='button'>
                        <FiTrash2 size={20} color='#a8a8b3' />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile