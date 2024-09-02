import React, { useState, useRef, useEffect } from 'react';
import { $axios } from '../utils';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
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

function Project() {
    const [employeeId, setEmployeeId] = useState('');
    const { data: getAllTasks, loading, error } = useQuery(GET_TASKS, {
        variables: { employeeId },
        skip: !employeeId,  // Skip query execution until employeeId is set
    });
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

    const { ID } = useParams();
    const [cursor, setCursor] = useState('grab');

    const missionModal = () => {
        setMission(!isMission);
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

    const [employeeRole, setEmployeeRole] = useState(null) 

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

    const createAndSendTask = (taskId, status) => {
        const url = `/task/updateCondition/${taskId}/${status}`;
        const data = {
            taskId: taskId,
            condition: status,
        };

        console.log('Sending PATCH request to:', url);
    
        $axios
            .patch(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('Response received:', response);
            })
            .catch((error) => {
                console.log(data);
                console.error('Error during PATCH request:', error);
                alert('Не удалось обновить задачу. Проверьте консоль для подробностей.');
            });
    };

    const handleDrop = (event, targetColumn) => {
        event.preventDefault();
    
        const draggedItemId = event.dataTransfer.getData('text');
        const newStatus = columnStatusMap[targetColumn];
    
        // Find the source column where the task is coming from
        const sourceColumn = Object.keys(items).find((col) =>
            items[col].some((task) => task.id === draggedItemId)
        );

        // If the task is dropped in the same column, do nothing
        if (sourceColumn === targetColumn) return;
    
        // Create the task and send it to the server
        createAndSendTask(draggedItemId, newStatus);
    
        // Update the state to move the task to the target column
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


    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                    {projectName}
                    <span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                </h1>
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
            {isMission && (
                <div className='DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center'>
                    <div ref={modalRef2} className='Modal bg-white rounded-[16px] p-[30px] w-[60%] duration-500 ease-in-out overflow-hidden'>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-[600] text-[24px] text-[#2D2D2D] font-montserrat'>
                                Task Actions
                            </h3>
                            <button
                                className='text-[#2D2D2D] text-[24px] font-montserrat'
                                onClick={missionModal}
                            >
                                X
                            </button>
                        </div>
                        <div className='pt-[20px]'>
                            <button
                                onClick={() => handleTaskAction('edit')}
                                className='bg-[#007bff] text-white py-[10px] px-[20px] rounded-[5px] mr-[10px]'
                            >
                                Edit Task
                            </button>
                            <button
                                onClick={() => handleTaskAction('delete')}
                                className='bg-[#dc3545] text-white py-[10px] px-[20px] rounded-[5px]'
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;
