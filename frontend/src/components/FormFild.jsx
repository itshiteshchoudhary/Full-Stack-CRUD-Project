import React from 'react'
import { MdCancelPresentation } from "react-icons/md";

const FormFild = ({handleSubmit,handelChange,handelClose,rest}) => {
    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-4 border-gray-400 h-[270px] w-[450px] justify-center items-center rounded-xl p-2' >
                <div className='ml-auto '><MdCancelPresentation onClick={handelClose} className='text-white text-4xl' /></div>
                <div>
                    <label htmlFor="name">Name  </label>
                    <input onChange={handelChange} type="text" id='name' name='name' value={rest.name} className='border-b-2 border-gray-600 outline-none relative overflow-hidden ml-6' />
                </div>
                <div>
                    <label htmlFor="email">Email </label>
                    <input onChange={handelChange} type='email' id='email' name='email' value={rest.email} className='border-b-2 border-gray-600 outline-none relative overflow-hidden ml-6' />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={handelChange} type='text' id='mobile' name='mobile' value={rest.mobile} className='border-b-2 border-gray-600 outline-none relative overflow-hidden ml-6' />
                </div>
                <button className='hover:text-white hover:text-xl'>Submit</button>
            </form >
        </div>
    )
}

export default FormFild