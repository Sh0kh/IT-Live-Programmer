import React, { useState, useRef, useEffect } from 'react'
import { $axios } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CONFIG from '../utils/Config';
function Profil() {


  const [Modal, setMdoal] = useState(false)
  const ModalActive = () => {
    setMdoal(!Modal)
  }
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);
  const [FotoModal, setFotoModal] = useState(false)
  const FotoModalActive = () => {
    setFotoModal(!FotoModal)
  }
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMdoal(false)
    }
    if (modalRef2.current && !modalRef2.current.contains(e.target)) {
      setFotoModal(false)
    }
  };
  useEffect(() => {
    if (Modal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [Modal,]);

  useEffect(() => {
    if (FotoModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [FotoModal,]);
  const PersonFoto = 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'


  const showSuccessToast = () => {
    toast.success('O`zgartirish!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  const showErrorToast = () => {
    toast.error('Xato!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };



  const [information, setInformation] = useState([])
  const GetMyInformation = () => {
    $axios.get('/common-user/myInformation', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {        
        setInformation(response.data)
        setEdit({
          name: response.data.name || '',
          phoneNumber: response.data.phoneNumber || '',
          password: '',
          surname: response.data.surname || '',
        });
      })
      .catch((error) => {
        console.log(error);

      })
  }
  useEffect(() => {
    GetMyInformation()
  }, [])


  const [edit, setEdit] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    surname: ''
  })
  const EditMyInformation = (e) => {
    e.preventDefault()
    $axios.put('/common-user/updateMyInformation', {
      name: edit.name,
      phoneNumber: edit.phoneNumber,
      password: edit.password,
      surname: edit.surname,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        showSuccessToast()
        ModalActive()
        GetMyInformation()
      })
      .catch((error) => {
        showErrorToast()
      })
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};
  const editFoto = (e) =>{
    e.preventDefault()
    const formData = new FormData();
    if (selectedFile) {
      formData.append('avatar', selectedFile);
  } else {
      formData.append('avatar', edit.file);
  }
  $axios.put('/common-user/updateMyAvatarImage',formData,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
  },
  })
  .then((response)=>{
    showSuccessToast()
    GetMyInformation()
    FotoModalActive()
  })
  .catch((error)=>{
    showErrorToast()
    console.log(error);
  })
  }
  return (
    <div className='Profile w-full mt-[50px]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[42px] font-bold'>
          Profil
        </h1>
        <button onClick={ModalActive} className='bg-btnColor px-[20px] py-[10px] rounded-[16px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
          O'zgartirish
        </button>
      </div>
      <div className='ProfileWrapper bg-white p-[30px] rounded-[16px] w-[550px] relative mt-[60px]'>
        <img onClick={FotoModalActive} src={information.avatarUrl ? CONFIG.API_URL + information.avatarUrl : PersonFoto} alt="" className='profileFoto absolute top-[-25%] left-[37%] cursor-pointer rounded-[50%] w-[150px] h-[150px] object-cover' />
        <div className='text-center mt-[70px]'>
          <h2 className='text-[25px] font-bold'>
            {information.name} {information.surname}
          </h2>
          <span className='text-[16px] text-[#4F5759] font-medium block mt-[10px]'>
            {information.role}
          </span>
        </div>
        <div className='ProfilGrid flex items-center justify-center gap-5 mt-[30px]'>
          <div className=' flex items-center gap-[16px] cursor-pointer'>
            <svg className='text-[25px] text-[#4F5759]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M17.256 12.253c-.096-.667-.611-1.187-1.274-1.342c-2.577-.604-3.223-2.088-3.332-3.734C12.193 7.092 11.38 7 10 7s-2.193.092-2.65.177c-.109 1.646-.755 3.13-3.332 3.734c-.663.156-1.178.675-1.274 1.342l-.497 3.442C2.072 16.907 2.962 18 4.2 18h11.6c1.237 0 2.128-1.093 1.953-2.305zM10 15.492c-1.395 0-2.526-1.12-2.526-2.5s1.131-2.5 2.526-2.5s2.526 1.12 2.526 2.5s-1.132 2.5-2.526 2.5M19.95 6c-.024-1.5-3.842-3.999-9.95-4C3.891 2.001.073 4.5.05 6s.021 3.452 2.535 3.127c2.941-.381 2.76-1.408 2.76-2.876C5.345 5.227 7.737 4.98 10 4.98s4.654.247 4.655 1.271c0 1.468-.181 2.495 2.76 2.876C19.928 9.452 19.973 7.5 19.95 6"></path></svg>
            <div className='flex items-center justify-center flex-col'>
              <span className='text-[16px] text-[#4F5759] font-[500]'>
                {information.phoneNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${Modal ? 'DeleteModalActive' : ''}`}>
        <div ref={modalRef} className='Modal bg-customBg rounded-[16px] p-[30px] w-[360px]'>
          <h2 className='text-btnColor text-[26px] font-[600] text-center '>
            O'zgartirish
          </h2>
          <div className=' mt-[20px]'>
            <form onSubmit={EditMyInformation}>
              <label htmlFor="">
                <input
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  type="text" placeholder='Ism' className='bg-transparent outline-none border-b-[2px] border-b-[#83818E] w-full text-[white] pb-[5px] mb-[20px]' />
              </label>
              <label htmlFor="">
                <input
                  value={edit.surname}
                  onChange={(e) => setEdit({ ...edit, surname: e.target.value })}
                  type="text" placeholder='Familiya' className='bg-transparent outline-none border-b-[2px] border-b-[#83818E] w-full text-[white] pb-[5px]  mb-[20px]' />
              </label>
              <label htmlFor="">
                <input
                  value={edit.phoneNumber}
                  onChange={(e) => setEdit({ ...edit, phoneNumber: e.target.value })}
                  type="text" placeholder='Telefon raqam' className='bg-transparent outline-none border-b-[2px] border-b-[#83818E] w-full text-[white] pb-[5px]  mb-[20px]' />
              </label>
              <label htmlFor="">
                <input
                  value={edit.password}
                  onChange={(e) => setEdit({ ...edit, password: e.target.value })}
                  type="text" placeholder='Parol' className='bg-transparent outline-none border-b-[2px] border-b-[#83818E] w-full text-[white] pb-[5px]  mb-[20px]' />
              </label>
              <button type='submit' className='bg-btnColor px-[20px] py-[10px] rounded-[16px] border-[2px] border-btnColor hover:text-[white] hover:bg-transparent transition duration-500 flex items-center justify-center gap-[10px] w-full'>
                <svg className='text-[20px] ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                <span>
                  Saqlash
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${FotoModal ? 'DeleteModalActive' : ''}`}>
        <div ref={modalRef2} className='Modal bg-customBg rounded-[16px] p-[30px] w-[360px]'>
          <h2 className='text-btnColor text-[26px] font-[600] text-center '>
            O'zgartirish
          </h2>
          <div className=' mt-[20px]'>
            <form onSubmit={editFoto}>
              <div className="modal-foto">
                <label className="file-input-container" htmlFor="photo">
                  <span>Rasm</span>
                  <input id="photo" onChange={handleFileChange} accept="image/*" type="file" />
                </label>
              </div>
              <button type='submit' className='bg-btnColor px-[20px] py-[10px] rounded-[16px] border-[2px] border-btnColor hover:text-[white] hover:bg-transparent transition duration-500 flex items-center justify-center gap-[10px] w-full mt-[20px]'>
                <svg className='text-[20px] ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                <span>
                  Saqlash
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profil