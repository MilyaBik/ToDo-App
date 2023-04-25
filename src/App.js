import React from 'react';
import List from './components/List';
import listSvg from './assets/img/list.svg'



function App() {
  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List items = {[
            {
              icon: <i>
                      <img src={listSvg} alt="list icon"/>
                    </i>,
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
              name: 'Фронтенд'
            },
            {
              color: 'pink',
              name: 'Фильмы и сериалы'
            },
            
          ]}
          isRemovable
          />
        </div>
        <div className="todo__tasks">
          
        </div>
    </div>
  );
}

export default App;
