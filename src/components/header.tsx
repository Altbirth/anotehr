import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  return (
    <header className=''>
      <div className='container mx-auto flex items-center justify-between'>
        <div>
          {/* <Link href="/">
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Link> */}
        </div>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300'>
            Home
          </Link>
          <Link href="/profile" className='mx-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300'>
            Profile
          </Link>
          <Link href="/posts" className='mx-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
