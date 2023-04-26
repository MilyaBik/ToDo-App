import React from 'react';
import List from '../List';
import './AddList.scss';

import plusSvg from '../../assets/img/plus-black.svg'



const AddList = () => {

    return (
        <div className="add-list">
<           List items = {[
                {
                    className: "list__add-button",
                    icon: <i><img src={plusSvg} alt="plus icon"/></i>,
                    name: 'Добавить список'
                },  
            ]} />
            <div className="add-list-popup">
                <h1>123</h1>
            </div>
        </div>
    )

}

export default AddList;