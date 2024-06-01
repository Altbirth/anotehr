import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  return (
    <header className=''>
      <div className='container mx-auto flex items-center justify-between'>
        <div>
       
        </div>
        <nav className='flex justify-end'>
          <Link href="/" className='px-4 py-2 text-white hover:text-gray-300 transition duration-300'>
            Home
          </Link>
          <Link href="/profile" className='px-4 py-2 text-white hover:text-gray-300 transition duration-300'>
            Profile
          </Link>
          <Link href="/posts" className='px-4 py-2 text-white hover:text-gray-300 transition duration-300'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
