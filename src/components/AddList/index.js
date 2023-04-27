import React, {useState} from 'react';
import List from '../List';
import './AddList.scss';

import plusSvg from '../../assets/img/plus-black.svg'



const AddList = () => {

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
            </div>)}
        </div>
    )

}

export default AddList;