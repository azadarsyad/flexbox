import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='bg-header p-4'>
    <div className='container mx-auto flex'>
      <div className="flex-auto">
		<Link className='no-underline text-black font-bold' to='/'><img src="/images/Logo-inline.png"/></Link>
      </div>
      <div className='flex py-6'>
		<Link className="text-base no-underline text-blue-white px-8" to='/'>HOME</Link>
		<Link className="text-base no-underline text-blue-white px-8" to='/'>ABOUT</Link>
		<Link className="text-base no-underline text-blue-white px-8" to='/'>OUR WORK</Link>
		<Link className="text-base no-underline text-blue-white px-8" to='/'>CONTACT</Link>
      </div>
    </div>
  </nav>
)

export default Header