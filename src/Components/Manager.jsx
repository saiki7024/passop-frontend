import React from 'react'
import { useRef,useState,useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({site:"",username:"",password:""})
  const ref = useRef()
  const passwordRef = useRef()
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async() => {
    let req = await fetch('http://localhost:3000')
    let passwords = await req.json()
    if(passwords){
      console.log(passwords)
      setPasswordArray(passwords)
    }
  }
  

  useEffect(() => {
    getPasswords()
    
  }, [])

  const copyText = (text) =>{
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition:Bounce,
      });
      
    navigator.clipboard.writeText(text)
  }
  
  const showPassword = () => {
    if(ref.current.src.includes("src/assets/eyeclosed.svg")){
      ref.current.src = "src/assets/eye.svg"
      passwordRef.current.type = "password"
    }
    else{
        passwordRef.current.type = "text"
        ref.current.src = "src/assets/eyeclosed.svg"
      }
    }
  
    const savePassword = async() => {
      if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
        setPasswordArray([...passwordArray,{...form, id: uuidv4()}])

        //if any such id exists
         await fetch("http://localhost:3000",{method:"DELETE", headers:{"Content-type":"application/json"}, body: JSON.stringify({id:form.id})})

         await fetch("http://localhost:3000",{method:"POST", headers:{"Content-type":"application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id: uuidv4()}]))
        console.log([...passwordArray,{...form, id: uuidv4()}])
        setform({site:"",username:"",password:""})
        toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
      });
    }
    else{
      toast('Error:Password not saved!')
    }
  }

    const deletePassword =async (id) => {
      console.log("deleting password with id",id)
      let con = confirm("Do you really want to delete this passo?")
      if(con){
        setPasswordArray(passwordArray.filter(item => item.id!==id))
        let res = await fetch("http://localhost:3000",{method:"DELETE", headers:{"Content-type":"application/json"}, body: JSON.stringify({id})})
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id)))
        // console.log([...passwordArray,{...form, id: uuidv4()}])
      }
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        });
    }

    const editPassword = (id) => {
      console.log("Editing password with id",id)
      setform({...passwordArray.filter(i=>i.id === id)[0],id: id})
      setPasswordArray(passwordArray.filter(item => item.id!==id)) 
      toast('Password edited',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        });     
    }

    const handleChange = (e) => {
      setform({...form, [e.target.name]: e.target.value})
    }
    

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed top-0 left-0 z-[-2] h-full w-full min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

        <div className="md: mycontainer container mx-auto">
          <h2 className='text-4xl font-bold text-center md:text-start'>
            <span className='text-purple-500'>&lt;</span> <span className='text-white'>Pass</span><span className='font-bold text-purple-500 '>OP/&gt;</span>
          </h2>
          <p className='font-bold text-lg text-purple-300 px-2 py-3 text-center md:text-start'>Your own password storage platform</p>

          <div className="flex flex-col gap-8 items-center">
            <input onChange={handleChange} value={form.site} className='rounded-full border border-white w-full px-4 py-1 text-white' type="text" name="site" id="" placeholder="Enter the URL" />
            <div className="flex flex-col md:flex-row w-full gap-8 ">
              <input onChange={handleChange} value={form.username} className='rounded-full border border-white w-full px-4 py-1 text-white' type="text" name="username" id="" placeholder="Enter Username" />
              <div className="relative">

                <input ref={passwordRef} onChange={handleChange} value={form.password} className='rounded-full border border-white w-full px-4 py-1 text-white' type="password" name="password" id="" placeholder="Enter Password" />
                <span className='absolute right-1 top-1.5 text-white cursor-pointer'>
                  <img ref={ref} className='w-[24px] h-[24px]' src="src/assets/eye.svg" alt="" onClick={showPassword} />
                </span>
              </div>
            </div>

            <button className='text-white flex items-center gap-3 border rounded-full border-white w-fit px-3 py-1 hover:bg-gray-700' onClick={savePassword} ><lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            >
            </lord-icon>Save Password</button>
          </div>
          <h2 className='text-white text-2xl py-3 font-bold'>Your Passwords</h2>
          {passwordArray.length === 0 && <div className='text-white py-2'>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full text-white rounded-lg overflow-hidden">
            <thead className='text-black bg-white' >
              <tr>
                <th className='py-2 border border-black'>Site</th>
                <th className='py-2 border border-black'>Username</th>
                <th className='py-2 border border-black'>Password</th>
                <th className='py-2 border border-black'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return <tr>
                  <td className='py-3 flex items-center justify-center gap-2 border border-white text-center'>
                    <a target="_blank" href={item.site}>{item.site}</a>
                    <div className="copyicon">
                      <img className='h-5 w-5 pt-1 cursor-pointer' src="src/assets/copy.svg" alt="" onClick={() => { copyText(item.site) }} />
                    </div>
                  </td>

                  <td className='py-2  border border-white text-center'>
                    <div className="copyicon flex items-center justify-center gap-2">
                      <span>{item.username}</span>
                      <img className='h-5 w-5 pt-1 cursor-pointer' src="src/assets/copy.svg" alt="" onClick={() => { copyText(item.username) }} />
                    </div>
                  </td>

                  <td className='py-2  border border-white text-center'>
                    <div className="copyicon flex items-center justify-center gap-2">
                      <span>{"*".repeat(item.password.length)}</span>
                      <img className='h-5 w-5 pt-1 cursor-pointer' src="src/assets/copy.svg" alt="" onClick={() => { copyText(item.password) }} />
                    </div>
                  </td>
                  <td className='py-2  border border-white text-center'>
                    <span className='cursor-pointer' >
                      <lord-icon onClick={() => { deletePassword(item.id) }}
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer' >
                      <lord-icon onClick={() => { editPassword(item.id) }}
                        src="https://cdn.lordicon.com/fikcyfpp.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ffffff"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
          }
        </div>
      </div>
  )
}

export default Manager
