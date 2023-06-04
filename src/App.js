import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {AddList, List, Tasks} from './components';

import listSvg from './assets/img/list.svg'


function App() {


  const[lists, setLists] = useState(null);
  const[colors, setColors] = useState(null);


  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

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

          <List 
            items = {lists} 
            onRemove = {(item) => alert(1)}
            isRemovable
          />

          <AddList onAdd={onAddList} colors={colors}/>

        </div>
        <div className="todo__tasks">
            <Tasks />
        </div>
    </div>
  );
}

export default App;
