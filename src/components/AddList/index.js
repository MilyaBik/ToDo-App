import React, {useState} from 'react';
import List from '../List';
import './AddList.scss';
import Badge from '../Badge';

import plusSvg from '../../assets/img/plus-black.svg';
import closeSvg from '../../assets/img/close.svg';


const AddList = ({colors}) => {

    const [visiblePopup, setVisiblePopup] = useState(true);
    const [selectedColor, selectColor] = useState(colors[0].id);
   

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
                onClick={() => setVisiblePopup(false)}
                src={closeSvg} 
                alt="Close button" 
                className='add-list__popup-close-btn' 
                />
                <input className="field" type="text" placeholder="Название списка"/>
                <div className="add-list__popup-colors">
                    {colors.map(color => <Badge 
                            onClick={() => selectColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                    />)
                    }
                </div>
                <button className='button'>Добавить</button>
            </div>)}
        </div>
    )

}

export default AddList;