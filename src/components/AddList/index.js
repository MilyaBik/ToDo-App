import React, {useState} from 'react';
import axios from 'axios';

import List from '../List';
import './AddList.scss';
import Badge from '../Badge';

import plusSvg from '../../assets/img/plus-black.svg';
import closeSvg from '../../assets/img/close.svg';


const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    const addList = () => { 
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        
        axios
            .post('http://localhost:3001/lists', { 
                name: inputValue, 
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = {...data, color: { name: color }};
                onAdd(listObj);
                onClose();
                
            })
            .catch(() => {
                alert('Ошибка при добавлении списка!')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="add-list">
        <List 
            onClick = {() => setVisiblePopup(true)}
            items = {[
                {
                    className: "list__add-button",
                    icon: <i><img src={plusSvg} alt="plus icon"/></i>,
                    name: 'Добавить список'
                },  
            ]} />
            {visiblePopup && (<div className="add-list__popup">
                <img 
                onClick={onClose}
                src={closeSvg} 
                alt="Close button" 
                className='add-list__popup-close-btn' 
                />
                <input 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)}
                    className="field"
                    type="text" 
                    placeholder="Название списка"
                />
                <div className="add-list__popup-colors">
                    {colors.map(color => <Badge 
                            onClick={() => selectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                    />)
                    }
                </div>
                <button onClick={addList} className='button'>{isLoading ? 'Добавление...' : 'Добавить'}</button>
            </div>)}
        </div>
    )

}

export default AddList;