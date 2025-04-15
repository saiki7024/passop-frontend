import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className=' bg-black text-white'>
        <div className="md: mycontainer container mx-auto flex justify-between items-center px-14 py-5">

          <div className="logo text-2xl font-bold">
            <span className='text-purple-500'>&lt;</span>Pass<span className='font-bold text-purple-500 '>OP/&gt;</span>
          </div>

          <div className="options">
            <ul className='flex space-x-4'>
              {/* <li><a className='hover:font-bold' href="/">Home</a></li>
              <li><a className='hover:font-bold' href="/">About</a></li>
              <li><a className='hover:font-bold' href="/">Contact Us</a></li>
              <li><a className='hover:font-bold' href="/">Help</a></li> */}
              {/* <li><a className='hover:font-bold' href="/">Github</a></li> */}
              <button className='text-blackpy-1 px-3 rounded-full flex items-center gap-2 border py-1 hover:bg-gray-700'>
                <img className='h-8 w-8' src="src/assets/github.svg" alt="" />
                <a target="_blank" href="https://github.com/">GitHub</a>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
