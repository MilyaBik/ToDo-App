import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, useHistory} from 'react-router-dom'

import {AddList, List, Tasks} from './components';

import listSvg from './assets/img/list.svg'


function App() {


  const[lists, setLists] = useState(null);
  const[colors, setColors] = useState(null);
  const[activeItem, setActiveItem] = useState(null);
  let history = useHistory();

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

  const onAddList = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask= (listId, taskObj) => {
    const newList = lists.map(item => {
      if(item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList)
  };


  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if(item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
      const listId = history.location.pathname.split('lists/')[1];
      if (lists) {
        const list = lists.find(list => list.id === Number(listId));
        setActiveItem(list)
      }
  }, [lists, history.location.pathname])

  return (
    <div className="todo">
        <div className="todo__sidebar">
          <List 
           onClickItem = {list => {
            history.push(`/`);
          }}
            items = {[
              {
                active: true,
                icon: <i><img src={listSvg} alt="list icon"/></i>,
                name: 'Все задачи',
              },
            ]} />
          {lists ? (
          <List 
            items = {lists} 
            onRemove = {(id) => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem = {list => {
              history.push(`/lists/${list.id}`);
            }}
            activeItem={activeItem}
            isRemovable
          />
          ) : (
            'Загрузка...'
          )}
          <AddList onAdd={onAddList} colors={colors}/>

        </div>
        <div className="todo__tasks">
          <Route exact path="">
            {
              lists && 
              lists.map(list => 
              (<Tasks 
                key={list.id}
                list={list} 
                onAddTask={onAddTask} 
                onEditTitle={onEditListTitle}
                withoutEmpty
                /> 
              ))}
          </Route>
          <Route path="/lists/:id">
            {lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle}/>}
          </Route>
        </div>
    </div>
  );
}

export default App;
