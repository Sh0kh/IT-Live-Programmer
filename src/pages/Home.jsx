import React from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
function Home() {
  const percentage = 50;
  const percentage2 = 25;
  const percentage3 = 10;
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className='MyProject w-full pb-[50px] pr-[200px]'>
      <div className='mt-[50px] '>
        <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
          Loyihalar
        </h1>
        <div className='MyProject__wrapper mt-[25px] grid grid-cols-3 gap-[30px]'>
          <div className=' MyProject__card bg-white  text-center rounded-[16px] w-[284px] pb-[10px] h-fit'>
            <NavLink to='/project'>
              <div className='w-full p-[30px]'>
                <div className='w-[105px] h-[105px] mx-auto'>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      textColor: "#00C853", // Цвет текста
                      pathColor: "#00C853", // Цвет прогресса
                      trailColor: "#d6d6d6", // Цвет фона прогресса
                      textSize: '34px',
                      textAnchor: 'middle',
                      textAlign: 'center',
                      fontWeight: 'bold',

                    })}
                  />
                </div>
                <span className='font-[500] text-[16px] font-montserrat block mb-[30px] mt-[10px]'>
                  “Loyiha nomi”
                </span>
                <div className='flex items-center gap-[10px] flex-col w-full'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                        Start
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>

                        Finish
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>

            <Accordion open={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                <button className='font-montserrat text-[16px] text-[#1F1E30] font-[500] border-t-2 w-full pt-[10px]'>
                  ko’proq
                </button>
              </AccordionHeader>
              <AccordionBody>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    frontend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#1ADC73] rounded-[5px] text-white'>
                    50%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    ui ux
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F00B0B] rounded-[5px] text-white'>
                    10%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    backend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F97B07] rounded-[5px] text-white'>
                    25%
                  </button>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
          <div className=' MyProject__card bg-white  text-center rounded-[16px] w-[284px] pb-[10px] h-fit'>
            <NavLink to='/project'>
              <div className='w-full p-[30px]'>
                <div className='w-[105px] h-[105px] mx-auto'>
                  <CircularProgressbar
                    value={percentage2}
                    text={`${percentage2}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      textColor: "#F97B07", // Цвет текста
                      pathColor: "#F97B07", // Цвет прогресса
                      trailColor: "#d6d6d6", // Цвет фона прогресса
                      textSize: '34px',
                      textAnchor: 'middle',
                      textAlign: 'center',
                      fontWeight: 'bold',

                    })}
                  />
                </div>
                <span className='font-[500] text-[16px] font-montserrat block mb-[30px] mt-[10px]'>
                  “Loyiha nomi”
                </span>
                <div className='flex items-center gap-[10px] flex-col w-full'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                        Start
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>

                        Finish
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                </div>
              </div>

            </NavLink>
            <Accordion open={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                <button className='font-montserrat text-[16px] text-[#1F1E30] font-[500] border-t-2 w-full pt-[10px]'>
                  ko’proq
                </button>
              </AccordionHeader>
              <AccordionBody>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    frontend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#1ADC73] rounded-[5px] text-white'>
                    50%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    ui ux
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F00B0B] rounded-[5px] text-white'>
                    10%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    backend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F97B07] rounded-[5px] text-white'>
                    25%
                  </button>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
          <div className=' MyProject__card bg-white  text-center rounded-[16px] w-[284px] pb-[10px] h-fit'>
            <NavLink to='/project'>
              <div className='w-full p-[30px]'>
                <div className='w-[105px] h-[105px] mx-auto'>
                  <CircularProgressbar
                    value={percentage3}
                    text={`${percentage3}%`}
                    strokeWidth={12}
                    styles={buildStyles({
                      textColor: "#F00B0B", // Цвет текста
                      pathColor: "#F00B0B", // Цвет прогресса
                      trailColor: "#d6d6d6", // Цвет фона прогресса
                      textSize: '34px',
                      textAnchor: 'middle',
                      textAlign: 'center',
                      fontWeight: 'bold',

                    })}
                  />
                </div>
                <span className='font-[500] text-[16px] font-montserrat block mb-[30px] mt-[10px]'>
                  “Loyiha nomi”
                </span>
                <div className='flex items-center gap-[10px] flex-col w-full'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                        Start
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-[10px]'>
                      <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>

                        Finish
                      </span>
                    </div>
                    <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                      19.09.24
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
            <Accordion open={open === 3}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                <button className='font-montserrat text-[16px] text-[#1F1E30] font-[500] border-t-2 w-full pt-[10px]'>
                  ko’proq
                </button>
              </AccordionHeader>
              <AccordionBody>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    frontend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#1ADC73] rounded-[5px] text-white'>
                    50%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    ui ux
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F00B0B] rounded-[5px] text-white'>
                    10%
                  </button>
                </div>
                <div className='flex items-center justify-between px-[20px] mb-[15px]'>
                  <span>
                    backend
                  </span>
                  <button className='px-[8px] py-[2px] bg-[#F97B07] rounded-[5px] text-white'>
                    25%
                  </button>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home