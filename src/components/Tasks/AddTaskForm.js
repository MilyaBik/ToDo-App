import React, {useState} from 'react';
import axios from "axios";

import addSvg from  '../../assets/img/add.svg';


export default function AddTaskForm({list, onAddTask}) {

const [visibleForm, setFormVisible] = useState(false);
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState('');

const toogleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
}

const addTask = () => {
    const obj = {
        id:list.id,
        listId: list.id,
        text: inputValue,
        completed: false
    };
    setIsLoading(true);
    axios.post('http://localhost:3001/tasks' + obj)
    .then(({ data }) => {
        onAddTask(list.id, data);
        toogleFormVisible();
    })
    .catch(() => {
        alert('Ошибка при добавлении задачи!')
    })
    .finally(() => {
        setIsLoading(false);
    })
}

return (
    <div className="tasks__form">
        {!visibleForm ? 
        (<div onClick={toogleFormVisible} className="tasks__form-new">
            <img src={addSvg} alt="Add icon" />
            <span>Новая задача</span>
        </div>) : 
        (<div className="task__form-block">
            <input
                value={inputValue}
                className="field"
                type="text" 
                placeholder="Текст задачи"
                onChange={e => setInputValue(e.target.value)}
            />
            <button disabled={isLoading} onClick={addTask} className='button'>
                {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
            <button onClick={toogleFormVisible} className='button button--grey'>Отмена</button>
        </div>)}
    
    </div>
    )
}
