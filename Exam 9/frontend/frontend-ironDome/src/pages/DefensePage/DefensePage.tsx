import React from 'react'

const DefensePage = () => {
  return (
    <div className='defense-page'>
        <h1>Organization: {organization.name}</h1>
        <div className='nav-bar'>
            <h3>Avaliable Ammo</h3>
            <div>
                <span>Hetz-1 {organization.resource.amount}</span>
                <span>Kipat-Barzel {organization.resource.amount}</span>
                <span>Hetz-3 {organization.resource.amount}</span>
            </div>
            <h2>Launched Rockets</h2>
        </div>

    </div>
  )
}

export default DefensePage