import React, { useState, useRef, useEffect } from 'react';
import { $axios } from '../utils';
import { useParams } from 'react-router-dom';
// gql

import { gql, useQuery } from '@apollo/client';
const GET_TASKS = gql`
    query{
  TaskCommon(
    ProjectId: "d02e1bb7-c013-4773-a72b-103dca4d17c0"
    SortByEmployeeProjectId: "65563a6a-b27f-483a-9008-7b7daf7d1aa3"
  ) {
    condition
    tasks {
      id
      title
      description
      fileUrl
      lastTypeUpdateAt
    	endAt
    }
  }
}
`
function Project() {
    const modalRef2 = useRef(null);
    const [IsMission, setMission] = useState(false);

    const MissionModal = () => {
        setMission(!IsMission);
    };

    const handleClickOutside2 = (e) => {
        if (modalRef2.current && !modalRef2.current.contains(e.target)) {
            setMission(false);
        }
    };

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
// GET project 

const {ID} = useParams()
const [ProjectName, SetProjectName] = useState([])
const getProject = ()=>{
    $axios.get(`/project/getById/${ID}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
    })
    .then((response)=>{
        SetProjectName(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
}
const [employeeId, setEmployeeId] = useState('')
const getProjectEmployee = ()=>{
    $axios.get('/employee/project/getMyProjects',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
    })
    .then((response)=>{
        setEmployeeId(response.data[0].employeeProjectId)
    })
    .catch((error)=>{
        console.log(error);  
    })
}

useEffect(()=>{
    getProject()
    getProjectEmployee()
},[])


// Get Task

const {data:Task} = useQuery(GET_TASKS)
console.log(Task?.TaskCommon[0]?.tasks[0]?.title);

// PATCH task

const Patch = () =>{
    $axios.patch(`/task/updateCondition/${ID}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
    })
    .then((response)=>{
        
    })
    .catch((error)=>{
        console.log(error);
        
    })
}



    // Drag and Drop
    const [items, setItems] = useState({
        column1: ['Mediya yozish', 'Backend yozish',],
        column2: [],
        column3: [],
    });

    const draggingItem = useRef(null);
    const draggingIndex = useRef(null);
    const [cursor, setCursor] = useState('grab');

    const handleDragStart = (event) => {
        draggingItem.current = event.target;
        draggingIndex.current = parseInt(event.target.dataset.index, 10);
        event.dataTransfer.effectAllowed = 'move';
        setCursor('grabbing');
    };

    const handleDragEnd = () => {
        draggingItem.current = null;
        draggingIndex.current = null;
        setCursor('grab');
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, column) => {
        event.preventDefault();
        const targetIndex = parseInt(event.target.dataset.index, 10);
        const droppedItemId = draggingItem.current.id;

        if (draggingItem.current && targetIndex !== undefined) {
            setItems(prevItems => {
                const sourceColumn = Object.keys(prevItems).find(col => prevItems[col].includes(droppedItemId));

                console.log('prevItems:', prevItems);
                console.log('sourceColumn:', sourceColumn);
                console.log('targetIndex:', targetIndex);

                if (!sourceColumn || !Array.isArray(prevItems[sourceColumn])) {
                    console.warn('Source column is not an array or does not exist.');
                    return prevItems;
                }

                const updatedSourceItems = prevItems[sourceColumn].filter(item => item !== droppedItemId);

                let updatedTargetItems;
                if (column === sourceColumn) {
                    updatedTargetItems = [
                        ...updatedSourceItems.slice(0, targetIndex),
                        droppedItemId,
                        ...updatedSourceItems.slice(targetIndex)
                    ];
                } else {
                    if (!Array.isArray(prevItems[column])) {
                        console.warn('Target column is not an array.');
                        return prevItems;
                    }

                    updatedTargetItems = [
                        ...prevItems[column].slice(0, targetIndex),
                        droppedItemId,
                        ...prevItems[column].slice(targetIndex)
                    ];
                }

                return {
                    ...prevItems,
                    [sourceColumn]: column === sourceColumn ? updatedSourceItems : updatedSourceItems,
                    [column]: column === sourceColumn ? updatedTargetItems : updatedTargetItems
                };
            });
        }
    };




    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                    {ProjectName}<span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                </h1>
                <div className='overflow-x-scroll pb-[50px]'>
                    <div className='flex gap-[25px] mt-[50px] w-[500px]'>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Boshlanish
                            </h2>
                            <div
                                onDrop={(e) => handleDrop(e, 'column1')}
                                onDragOver={handleDragOver}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    position: 'relative',
                                    cursor: cursor
                                }}
                                className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'
                            >
                                {items.column1.map((item, index) => (
                                    <div
                                        className='px-[10px] border-[1px] border-[#ABAAB9] w-full rounded-[10px] mb-[5px]'
                                        key={item}
                                        id={item}
                                        onClick={MissionModal}
                                        data-index={index}
                                        draggable
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Jarayon
                            </h2>
                            <div
                                onDrop={(e) => handleDrop(e, 'column2')}
                                onDragOver={handleDragOver}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    position: 'relative',
                                    cursor: cursor
                                }}
                                className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'
                            >
                                {items.column2.map((item, index) => (
                                    <div
                                        className='px-[10px] border-[1px] border-[#ABAAB9] w-full rounded-[10px] mb-[5px]'
                                        key={item}
                                        id={item}
                                        data-index={index}
                                        draggable
                                        onDragStart={handleDragStart}
                                        onClick={MissionModal}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Test
                            </h2>
                            <div
                                onDrop={(e) => handleDrop(e, 'column3')}
                                onDragOver={handleDragOver}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    position: 'relative',
                                    cursor: cursor
                                }}
                                className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'
                            >
                                {items.column3.map((item, index) => (
                                    <div
                                        className='px-[10px] border-[1px] border-[#ABAAB9] w-full rounded-[10px] mb-[5px]'
                                        key={item}
                                        id={item}
                                        data-index={index}
                                        draggable
                                        onClick={MissionModal}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Yakun
                            </h2>
                            <div
                                className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'
                            >

                            </div>
                        </div>
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
    );
}

export default Project;
