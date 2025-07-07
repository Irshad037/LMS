
import { MdOutlineMail } from 'react-icons/md';

const Footer = () => {
  return (

    <div className=' bg-gray-900 px-32 py-6 '>

      <div className='flex  items-center  gap-28'>

        <div className=' flex-1 flex  flex-col gap-5' >

          <div className='flex items-center justify-start'>
            <img src="/study.png" className='w-[60px]' />
            <h1 className='text-3xl font-extrabold text-white'>Learnify</h1>
          </div>

          <div>
            <p className=' text-white text-sm font-light'>
              Learnify is your all-in-one platform for mastering new skills and advancing your career.
              Whether you're a beginner or a pro, Learnify offers curated courses designed to help you grow.
            </p>
          </div>

        </div >

        <div className='flex-1'>

          <div>
            <h2 className='text-xl font-semibold text-white mt-7 mb-6'>Company</h2>
          </div>

          <div className=' text-white flex flex-col gap-1 font-light'>
            <h2>Home</h2>
            <h2>About us</h2>
            <h2>Contact us</h2>
            <h2>Privacy policy</h2>
          </div>

        </div>

        <div className='flex-1 text-white mt-7'>

          <div>
            <h2 className='text-xl font-semibold  mb-6'>
              Subscribe to our newsletter
            </h2>
          </div>

          <div>
            <p className='text-norm font-[300]'>The Latest news, articles and resources, sent to your inbox weekly</p>
          </div>

          <div className=' mt-4 flex gap-2 '>

            <label className='w-[300px] bg-zinc-800  rounded-[7px] h-[43px] p-2 gap-1 border-2 flex items-center justify-between border-none '>
              <MdOutlineMail className='w-[25px]' />
              <input
                type="email" placeholder='Email' className='flex-1  font-medium border-none outline-none bg-transparent'
                name='email'
              />
            </label>

            <button className='btn btn-primary'>Subscribe</button>
          </div>
        </div>



      </div>

      <div className=' bg-zinc-600 mt-10 h-[1px]' />
      
      <div className='text-zinc-400 font-normal flex items-center justify-center mt-4'>
        © 2025 Learnify — Empowering Learning. All rights reserved.
      </div>

    </div>



  )
}

export default Footer