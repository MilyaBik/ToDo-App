import React, {useState} from 'react';
import List from '../List';
import './AddList.scss';

import plusSvg from '../../assets/img/plus-black.svg'



const AddList = ({colors}) => {

    const [visiblePopup, setVisiblePopup] = useState(true);

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
                <input className="field" type="text" placeholder="Название списка"/>
                <div className="add-list__pop-colors">
                <ul>
                    <li></li>
                    <li></li>
                </ul>
                </div>
                <button className='button'>Добавить</button>
            </div>)}
        </div>
    )

}

export default AddList;