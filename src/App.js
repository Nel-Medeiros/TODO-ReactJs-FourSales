import React, {useState} from 'react';
import {nanoid} from 'nanoid';

import FlipMove from 'react-flip-move';

import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';


//criamos um objeto no qual cada valor é uma função. esses serão nossos filters buttons
const FILTER_MAP = {
  Tudo: () => true,
  Trabalho: task => !task.pessoal,
  Pessoal: task => task.pessoal,
};

//criamos uma variável que coletará um array de FILTER_NAMES utilizando as keys do FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('Tudo');

  //a função addTask recebe um 'name', que é o input do user, monta um objeto com id, name, e pessoal, em seguida chama a função 'setTask', utiliza o spred operator para copiar o array de tasks existente e adiciona a new task nesse array.
  //para não haver conflito de id, utilizei a lib 'nanoid' para gerar os ids das tasks
  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, pessoal: false};
    setTasks([...tasks, newTask]);
    console.log(tasks)
  }

  //a função editTask espera receber o id e um novo valor de name da task q a invocou. 
  function editTask(id, newName) {
    //a variável editedTaskList usa o map para iterar pelo array de tasks executando a função que compara o id recebido pela função com o id das tasks, se houver um id que combine com o recebido então é criado um novo objeto dessa task com os mesmos atributos excetuando apenas o 'name', que rebe um novo valor. Atualizamos o estado do array de tasks utilizando a variável editedTaskList.
    const editedTaskList = tasks.map(task => {
      //se o id recebido combinar com algum id do array...
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  function toggleTaskPessoal(id) {
    const updatedTasks = tasks.map(task => {
      //se essa task tiver o mesmo id da task editada
      if(id === task.id) {
        //usamos o spred para criar um novo objeto 'task' no qual a prop 'pessoal' foi invertida
        return {...task, pessoal: !task.pessoal}
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks[0])
  }

  function deleteTask(id) {
    //console.log(id);
    // a variável 'remainingTasks' vai receber um array de tasks, utilizando o filter, no qual o id da task que chamou a função não existe e, consequentemente, a task em si também não. Atualizamos o setTasks com essa variável.
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    //ao renderizar a taskList primeiro devemos fazer um filter para que sejam exibidas apenas as tasks selecionadas pelo FILTER_MAP 
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      pessoal={task.pessoal} 
      key={task.id} 
      toggleTaskPessoal={toggleTaskPessoal}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //aqui criamos uma variável que conta os elementos do nosso array de tasks e recebe a string 'tasks' se o array possuir mais de 1 elemento ou a string 'task' ou a string 'task' se possuir apenas 1.
  //e outra variável que imprime a quantidade de tasks restantes utilizando também a variável acima
  const tasksNoun = taskList.length > 1 ? 'tarefas restantes' : 'tarefa restante';
  const headingText = `${taskList.length} ${tasksNoun}`;

  

  return (
    <div className="todoapp stack-large">
      <h1>Lista de Tarefas</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <h4>Marque a caixa de texto em caso de tarefas pessoais.</h4>
      
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >  
           
        {taskList}  
      </ul>      
    </div>
  );
}

export default App;
