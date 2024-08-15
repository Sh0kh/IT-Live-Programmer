import React, { useState, useRef, useEffect } from 'react'
import Programmer from '/images/PmProgrammer.svg'
import Design from '/images/PmDesign.svg'
import SearchEmpte from '/images/SearchEmpty.png'
function Project() {
    const modalRef = useRef(null);
    const modalRef2 = useRef(null);
    const modalRef3 = useRef(null);
    const modalRef4 = useRef(null);
    const [isActiveSmallModal, setActiveSmallModal] = useState(false)
    const ActiveSmallModal = () => {
        setActiveSmallModal(!isActiveSmallModal)
    }
    const [deleteModal, SetDeleteModal] = useState(false)
    const DeleteModalActive = () => {
        SetDeleteModal(!deleteModal)
    }
    const DeleteModal = () => {
        ActiveSmallModal()
        DeleteModalActive()
    }

    const [IsMission, setMission] = useState(false)
    const MissionModal = () => {
        setMission(!IsMission)
    }
    const [AddPerson, setAddPerson] = useState(false)
    const AddPersonActive = () => {
        setAddPerson(!AddPerson)
    }
    const [isMessage, setMessage] = useState(false)
    const MessageActive = () => {
        setMessage(!isMessage)
    }

    const [isTeam, setTeam] = useState(false)
    const TeamModal = () => {
        setTeam(!isTeam)
    }

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            DeleteModal()
        }
    };
    const handleClickOutside2 = (e) => {
        if (modalRef2.current && !modalRef2.current.contains(e.target)) {
            setMission(false)
        }
    };
    const handleClickOutside3 = (e) => {
        if (modalRef3.current && !modalRef3.current.contains(e.target)) {
            setAddPerson(false)
        }
    };
    const handleClickOutside4 = (e) => {
        if (modalRef4.current && !modalRef4.current.contains(e.target)) {
            setMessage(false)
        }
    };

    useEffect(() => {
        if (deleteModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [deleteModal,]);

    useEffect(() => {
        if (IsMission) {
            document.addEventListener('mousedown', handleClickOutside2);
        } else {
            document.removeEventListener('mousedown', handleClickOutside2);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside2);
        };
    }, [IsMission]);
    useEffect(() => {
        if (AddPerson) {
            document.addEventListener('mousedown', handleClickOutside3);
        } else {
            document.removeEventListener('mousedown', handleClickOutside3);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside3);
        };
    }, [AddPerson]);
    useEffect(() => {
        if (isMessage) {
            document.addEventListener('mousedown', handleClickOutside4);
        } else {
            document.removeEventListener('mousedown', handleClickOutside4);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside4);
        };
    }, [isMessage]);

    const [isOpen, setOpen] = useState(null)
    const toggleModal = (e) => {
        setOpen(isOpen === e ? null : e);
    };

    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                    “Akfa medline” sayti <span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                </h1>
                <div className=' overflow-x-scroll pb-[50px]'>
                    <div className='flex  gap-[25px] mt-[50px] w-[300px]'>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Boshlanish
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                <div className='relative cursor-pointer rounded-[8px] border-[0.5px] border-[#ABAAB9] px-[11px] py-[10px] flex items-center justify-between mb-[25px]'>
                                    <div onClick={MissionModal} className='flex items-center gap-[10px]'>
                                        <div className=''>
                                            <img className='w-[35px] h-[35px]' src={Programmer} alt="" />
                                        </div>
                                        <span className='Project__card__worker__title font-[500] text-[#83818E] text-[20px] font-montserrat'>
                                            dasturchi
                                        </span>
                                    </div>
                                    <button onClick={ActiveSmallModal} className='cursor-pointer w-[50px] flex items-center justify-center' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="19" viewBox="0 0 5 19" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="9.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="16.5" r="2.5" fill="black" />
                                        </svg>
                                    </button>
                                    <div onClick={DeleteModalActive} className={`smallModal absolute  py-[5px] pl-[10px] pr-[5px] right-[-50px] rounded-[10px] opacity-0 transition duration-300 ${isActiveSmallModal ? 'smallModalActive' : ''}`}>
                                        <div className='bg-[#FEE2D6] p-[5px]  rounded-[8px]'>
                                            <svg className='text-[25px] ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m-4.74 6.703A1.5 1.5 0 0 0 6.246 14h3.508a1.5 1.5 0 0 0 1.487-1.297L12.427 4H3.573z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Jarayon
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                <div className='cursor-pointer rounded-[8px] border-[0.5px] border-[#ABAAB9] px-[11px] py-[10px] flex items-center justify-between mb-[25px]'>
                                    <div onClick={MissionModal} className='flex items-center gap-[10px]'>
                                        <div className=''>
                                            <img className='w-[35px] h-[35px]' src={Design} alt="" />
                                        </div>
                                        <span className='Project__card__worker__title font-[500] text-[#83818E] text-[20px] font-montserrat'>
                                            dasturchi
                                        </span>
                                    </div>
                                    <button className='cursor-pointer' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="19" viewBox="0 0 5 19" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="9.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="16.5" r="2.5" fill="black" />
                                        </svg>
                                    </button>
                                    <div onClick={DeleteModalActive} className={`smallModal absolute  py-[5px] pl-[10px] pr-[5px] right-[-50px] rounded-[10px] opacity-0 transition duration-300 ${isActiveSmallModal ? 'smallModalActive' : ''}`}>
                                        <div className='bg-[#FEE2D6] p-[5px]  rounded-[8px]'>
                                            <svg className='text-[25px] ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m-4.74 6.703A1.5 1.5 0 0 0 6.246 14h3.508a1.5 1.5 0 0 0 1.487-1.297L12.427 4H3.573z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Test
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                <div className='cursor-pointer  rounded-[8px] border-[0.5px] border-[#ABAAB9] px-[11px] py-[10px] flex items-center justify-between mb-[25px]'>
                                    <div onClick={MissionModal} className='flex items-center gap-[10px]'>
                                        <div className=''>
                                            <img className='w-[35px] h-[35px]' src={Programmer} alt="" />
                                        </div>
                                        <span className='Project__card__worker__title font-[500] text-[#83818E] text-[20px] font-montserrat'>
                                            dasturchi
                                        </span>
                                    </div>
                                    <button className='cursor-pointer' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="19" viewBox="0 0 5 19" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="9.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="16.5" r="2.5" fill="black" />
                                        </svg>
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Yakun
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                <div className='cursor-pointer rounded-[8px] border-[0.5px] border-[#ABAAB9] px-[11px] py-[10px] flex items-center justify-between mb-[25px]'>
                                    <div onClick={MissionModal} className='flex items-center gap-[10px]'>
                                        <div className=''>
                                            <img className='w-[35px] h-[35px]' src={Programmer} alt="" />
                                        </div>
                                        <span className='Project__card__worker__title font-[500] text-[#83818E] text-[20px] font-montserrat'>
                                            dasturchi
                                        </span>
                                    </div>
                                    <button className='cursor-pointer' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="19" viewBox="0 0 5 19" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="9.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="16.5" r="2.5" fill="black" />
                                        </svg>
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${deleteModal ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef} className='Modal bg-customBg rounded-[16px] p-[30px] w-[360px]'>
                    <h2 className='text-btnColor text-[26px] font-[600] text-center '>
                        Xodim qo’shish
                    </h2>
                    <div className='flex items-center justify-center gap-[20px] mt-[20px]'>
                        <button onClick={DeleteModal} className='text-black bg-btnColor px-[20px] py-[5px] rounded-[16px] border-2 border-btnColor hover:bg-transparent hover:text-white transition duration-500 '>
                            Ha
                        </button>
                        <button onClick={DeleteModal} className='text-black bg-btnColor px-[20px] py-[5px] rounded-[16px] border-2 border-btnColor hover:bg-transparent hover:text-white transition duration-500 '>
                            Yoq
                        </button>
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px]  bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${IsMission ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef2} className='Modal  bg-white rounded-[16px] p-[30px] w-[60%] duration-500 ease-in-out overflow-hidden '>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-start gap-[7px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 2h-.585A1.5 1.5 0 0 0 9.5 1h-3a1.5 1.5 0 0 0-1.415 1H4.5A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 11.5 2m-5 0h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m.852 8.354l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707m0-4l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707M10.5 11H9a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1m0-4H9a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1"></path></svg>
                            <div>
                                <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                    Frontend kodlarini yozib tugatish
                                </h2>
                                <span className='text-[#83818E] text-[16px] font-[500] font-montserrat'>
                                    boshlanish bo’limida
                                </span>
                            </div>
                        </div>
                        <button onClick={MissionModal}>
                            <svg className='text-[#83818E] text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className='mt-[30px] mb-[15px]'>
                        <div className='flex items-center gap-[6px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.707A5.5 5.5 0 0 0 10.257 18H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm3.565 8.442a2 2 0 0 1-1.43 2.478l-.461.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.455 2.519l-.126.423q.387.306.835.517l.325-.344a2 2 0 0 1 2.909.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.478l.461-.118a4.7 4.7 0 0 0-.01-1.017l-.349-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.324.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.822.497zM14.5 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path></svg>
                            <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Ta’rif
                            </h2>
                        </div>
                        <div className='border-[2px] rounded-[16px] border-[#83818E] p-[15px] mt-[15px]'>
                        <p className=''>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis officiis quae totam iure maiores? Esse sapiente iure blanditiis illum doloremque, voluptate tempore! Facere iusto ad iure magni temporibus ut soluta.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project