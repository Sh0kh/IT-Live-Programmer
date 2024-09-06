import React, { useState, useRef, useEffect } from 'react';
import { $axios } from '../utils';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import CONFIG from '../utils/Config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GET_TASKS = gql`
    query GetTasks($employeeId: String!) {
        TaskCommon(SortByEmployeeProjectId: $employeeId) {
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
`;
const GET_TEAM_LEADER_TASK = gql`
    query TaskCommon($ID: String!) {
    TaskCommon(ProjectId: $ID) {
      condition
      tasks {
        id
        title
        description
        fileUrl
        endAt
         employeeProject{
         role
        employee{
			name
        }
      }
      }
    }
  }
`

function Project() {
    const SubRole = localStorage.getItem('SubRole')
    const [employeeId, setEmployeeId] = useState('');
    const [employeeRole, setEmployeeRole] = useState(null)
    const { ID } = useParams();


    const { data: getAllTasks, loading, error } = useQuery(
        SubRole === 'TEAM_LEADER' ? GET_TEAM_LEADER_TASK : GET_TASKS,
        {
            variables: SubRole === 'TEAM_LEADER' ? { ID } : { employeeId },
            skip: !employeeId && SubRole !== 'TEAM_LEADER',
        }
    );
    console.log(employeeId);




    const [items, setItems] = useState({
        column1: [],
        column2: [],
        column3: [],
        column4: [],
    });

    useEffect(() => {
        if (error) {
            console.error('Error fetching tasks:', error);
        }
        if (getAllTasks) {
            const initialItems = {
                column1: [],
                column2: [],
                column3: [],
                column4: [],
            };

            getAllTasks.TaskCommon.forEach((item) => {
                item.tasks.forEach((task) => {
                    switch (item.condition) {
                        case 'BEGIN':
                            initialItems.column1.push(task);
                            break;
                        case 'PROCESS':
                            initialItems.column2.push(task);
                            break;
                        case 'TEST':
                            initialItems.column3.push(task);
                            break;
                        case 'CONFIRMED':
                            initialItems.column4.push(task);
                            break;
                        default:
                            break;
                    }
                });
            });

            setItems(initialItems);
        }
    }, [loading, error, getAllTasks]);

    const modalRef2 = useRef(null);
    const [isMission, setMission] = useState(false);
    const [projectName, setProjectName] = useState('');

    const [cursor, setCursor] = useState('grab');


    const [InfoTask, setInfoTask] = useState([])
    const missionModal = (task) => {
        setMission(!isMission);
        setInfoTask(task)
    };
    const handleClickOutside2 = (e) => {
        if (modalRef2.current && !modalRef2.current.contains(e.target)) {
            setMission(false);
        }
    };
    useEffect(() => {
        if (isMission) {
            document.addEventListener('mousedown', handleClickOutside2);
        } else {
            document.removeEventListener('mousedown', handleClickOutside2);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside2);
        };
    }, [isMission]);

    const getProject = () => {
        $axios
            .get(`/project/getById/${ID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                setProjectName(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getProjectEmployee = () => {
        $axios
            .get('/employee/project/getMyProjects', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                findProject(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getProject();
    }, [ID]);

    useEffect(() => {
        if (ID) {
            getProjectEmployee();
        }
    }, [ID]);


    const findProject = (data) => {
        const foundObject = data.find(obj => obj.project.id === ID);
        if (foundObject) {
            setEmployeeId(foundObject.employeeProjectId);
            setEmployeeRole(foundObject.employeeProjectRole)
        } else {
            console.log("ID не найден.");
        }
    };


    const columnStatusMap = {
        column1: 'BEGIN',
        column2: 'PROCESS',
        column3: 'TEST',
        column4: 'CONFIRMED',
    };

    const showErrorToast = () => {
        toast.error('Sizda bunday huquq yo`q!', {
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

    const createAndSendTask = (taskId, status) => {
        // Проверка на запрещенные роли для статуса CONFIRMED
        if (status === 'CONFIRMED' && ['FRONT_END', 'BACK_END', 'DESIGNER', 'PROJECT_MANAGER'].includes(SubRole)) {
            return;
        }

        // Если роль TEAM_LEADER, отправляем запрос в зависимости от статуса
        if (SubRole === 'TEAM_LEADER') {
            let url;
            if (status === 'CONFIRMED') {
                url = `/task/confirmTask/${taskId}/${true}`;
            } else if (status === 'BEGIN') {
                url = `/task/confirmTask/${taskId}/${false}`;
            }

            if (url) {
                sendPatchRequest(url, { taskId, condition: status });
                return;
            }
        }

        // Обычное обновление задачи
        const url = `/task/updateCondition/${taskId}/${status}`;
        sendPatchRequest(url, { taskId, condition: status });
    };

    const sendPatchRequest = (url, data) => {
        $axios
            .patch(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {

            })
            .catch((error) => {
                showErrorToast()
            });
    };

    const handleDrop = (event, targetColumn) => {
        event.preventDefault();

        const draggedItemId = event.dataTransfer.getData('text');
        const newStatus = columnStatusMap[targetColumn];

        // Проверка на запрещенные роли для статуса CONFIRMED
        if (newStatus === 'CONFIRMED' && ['FRONT_END', 'BACK_END', 'DESIGNER', 'PROJECT_MANAGER'].includes(SubRole)) {
            showErrorToast();
            return;
        }

        // Проверка для TEAM_LEADER
        if (SubRole === 'TEAM_LEADER') {
            if (newStatus === 'PROCESS' || newStatus === 'TEST') {
                showErrorToast();
                return;
            }
        }

        // Находим исходную колонку, из которой перетаскивают задачу
        const sourceColumn = Object.keys(items).find((col) =>
            items[col].some((task) => task.id === draggedItemId)
        );

        // Если задача перемещается в ту же колонку, ничего не делаем
        if (sourceColumn === targetColumn) return;

        // Обновляем задачу и отправляем изменения на сервер
        createAndSendTask(draggedItemId, newStatus);

        // Обновляем состояние, перемещая задачу в целевую колонку
        setItems((prevItems) => {
            const draggedTask = prevItems[sourceColumn].find((task) => task.id === draggedItemId);
            const updatedSourceItems = prevItems[sourceColumn].filter((task) => task.id !== draggedItemId);
            const updatedTargetItems = [...prevItems[targetColumn], draggedTask];

            return {
                ...prevItems,
                [sourceColumn]: updatedSourceItems,
                [targetColumn]: updatedTargetItems,
            };
        });
    };




    const handleDragStart = (event, taskId) => {
        event.dataTransfer.setData('text', taskId);
        setCursor('grabbing');
    };

    const handleDragEnd = () => {
        setCursor('grab');
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };


    const downloadFile = async (fileUrl, name) => {
        try {
            const response = await fetch(CONFIG.API_URL + fileUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = name;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                console.error('Download failed:', response.statusText);
                console.log(response);

            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };



    const ESC_Close = (e) => {
        if (e.key === `Escape`) {
            setMission(false)
        }
    }
    useEffect(() => {
        document.addEventListener(`keydown`, ESC_Close)
        return () => {
            document.removeEventListener(`keydown`, ESC_Close)
        }
    }, [])


    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                        {projectName}
                        <span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                    </h1>
                    <h3 className='text-[22px] font-[600] text-TitleColor font-montserrat'>
                        {localStorage.getItem('SubRole') === 'TEAM_LEADER' ? 'Team leader' : ''}
                        {localStorage.getItem('SubRole') === 'FRONT_END' ? 'Frontend' : ''}
                        {localStorage.getItem('SubRole') === 'BACK_END' ? 'Backend' : ''}
                        {localStorage.getItem('SubRole') === 'DESIGNER' ? 'Dizayner' : ''}
                    </h3>
                </div>
                <div className='overflow-x-scroll pb-[50px]'>
                    <div className='flex gap-[25px] mt-[50px] w-[500px]'>
                        {['BEGIN', 'PROCESS', 'TEST', 'CONFIRMED'].map((status, idx) => (
                            <div key={idx} className='Project__card'>
                                <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                    {status === 'BEGIN' ? 'Boshlanish' :
                                        status === 'PROCESS' ? 'Jarayon' :
                                            status === 'TEST' ? 'Test' :
                                                'Yakun'}
                                </h2>
                                <div
                                    onDrop={(e) => handleDrop(e, `column${idx + 1}`)}
                                    onDragOver={handleDragOver}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        position: 'relative',
                                        cursor: cursor,
                                    }}
                                    className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'
                                >
                                    {items[`column${idx + 1}`]?.map((task) => (
                                        <div
                                            onClick={() => missionModal(task)}
                                            key={task.id}
                                            id={task.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task.id)}
                                            onDragEnd={handleDragEnd}
                                            className='px-[10px] border-[1px] border-[#ABAAB9] w-full rounded-[10px] mb-[5px]'
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`ModalBg p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${isMission ? 'ModalBgActive' : ''}`}>
                <div ref={modalRef2} className='Modal bg-white rounded-[16px] p-[30px] w-[60%] duration-500 ease-in-out overflow-hidden'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-start gap-[7px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 2h-.585A1.5 1.5 0 0 0 9.5 1h-3a1.5 1.5 0 0 0-1.415 1H4.5A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 11.5 2m-5 0h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m.852 8.354l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707m0-4l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707" /></svg>
                            <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Vazifa: {InfoTask.title}
                            </h1>
                        </div>
                        <svg onClick={missionModal} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.586L5.293 3.879a1 1 0 1 0-1.414 1.414L10.586 12l-6.707 6.707a1 1 0 0 0 1.414 1.414L12 13.414l6.707 6.707a1 1 0 0 0 1.414-1.414L13.414 12l6.707-6.707a1 1 0 0 0-1.414-1.414L12 10.586z" /></svg>
                    </div>
                    <div className='mt-[20px]'>
                        <div>
                            <div className='flex items-center gap-[6px]'>
                                <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.707A5.5 5.5 0 0 0 10.257 18H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm3.565 8.442a2 2 0 0 1-1.43 2.478l-.461.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.455 2.519l-.126.423q.387.306.835.517l.325-.344a2 2 0 0 1 2.909.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.478l.461-.118a4.7 4.7 0 0 0-.01-1.017l-.349-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.324.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.822.497zM14.5 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path></svg>
                                <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                    Ta’rif
                                </h2>
                            </div>
                            <div className='block w-full p-[10px]  rounded-[10px] border-[0.5px] border-[#B6BEC3]'>
                                <p>
                                    {InfoTask.description}
                                </p>
                            </div>
                        </div>
                        {SubRole === "TEAM_LEADER" && (
                            <div className='mt-[20px]'>
                                <div className='flex items-center gap-[6px]'>
                                    <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg>
                                    <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                        Xodim
                                    </h2>
                                </div>
                                <div className='block w-full p-[10px]  rounded-[10px] border-[0.5px] border-[#B6BEC3] flex items-center justify-between'>
                                    <span>
                                        {InfoTask?.employeeProject?.employee?.name}
                                    </span>
                                    <span>
                                        {({
                                            CLIENT: 'Mijoz',
                                            DESIGNER: 'Dizayner',
                                            FRONT_END: 'Frontend',
                                            BACK_END: 'Backend',
                                            PROJECT_MANAGER: 'Project Menejer',
                                            TEAM_LEADER: 'Team Leader',
                                        })[InfoTask?.employeeProject?.role] || ''}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className='mt-[20px]'>
                            <div className='flex items-center gap-[6px]'>
                                <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"></path></g></svg>
                                <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                    Berilgan vaqt
                                </h2>
                            </div>
                            <div className='block w-full p-[10px] w-full rounded-[10px] border-[0.5px] border-[#B6BEC3] flex items-center justify-between'>
                                <span >
                                    {InfoTask?.endAt?.split('T')[0]}
                                </span>
                                <span >
                                    {InfoTask?.endAt?.slice(11, 16)}
                                </span>
                            </div>
                        </div>
                        <div className='mt-[20px]'>
                            <button onClick={() => downloadFile(InfoTask?.fileUrl, 'file_name')} className='w-full px-[10px] py-[10px] rounded-[16px] border-[2px] border-btnColor bg-btnColor hover:bg-transparent transotion duration-500'>
                                File korish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Project;
