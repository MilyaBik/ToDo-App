import React from 'react';
import  AddListButton from './components/AddList';

import DB from './assets/db.json'

import List from './components/List';
import listSvg from './assets/img/list.svg'




function App() {
  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List 
            items = {[
              {
                icon: <i><img src={listSvg} alt="list icon"/></i>,
                name: 'Все задачи',
              },
            ]} />

          <List items = {[
            {
              color: 'green',
              name: 'Покупки'
            },
            {
              color: 'blue',
              name: 'Фронтенд',
              active: true
            },
            {
              color: 'pink',
              name: 'Фильмы и сериалы'
            },
            
          ]}
          isRemovable
          />

       
        <AddListButton colors={DB.colors}/>

        </div>
        <div className="todo__tasks">
          
        </div>
    </div>
  );
}

export default App;
