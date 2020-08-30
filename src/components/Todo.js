import React, {useState} from 'react';

import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import { BsCheckCircle } from 'react-icons/bs';
import { BsDashCircleFill } from 'react-icons/bs';

import {useSpring, animated} from 'react-spring'


export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const pop = useSpring({opacity: 1, from: {opacity: 0}})

    function handleChange(e) {
      setNewName(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

    //criamos duas UIs diferentes, uma para a visualização padrão da tarefa e uma para a edição da tarefa
    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            Editando a tarefa {props.name}
          </label>
          <input 
            id={props.id} 
            className="todo-text" 
            type="text" 
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div className="icon-group">
          <button className="tooltip"><BsDashCircleFill className="btn-icon cancel" onClick={() => setEditing(false)}  /><span class="tooltiptext">Cancelar<span className="visually-hidden">edição da tarefa {props.name}</span></span></button>          
          <button className="tooltip" type="submit"><BsCheckCircle  className="btn-icon save" /><span class="tooltiptext">Confirmar<span className="visually-hidden">edição da tarefa {props.name}</span></span></button>          
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">          
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.pessoal}
              //quando houver alteração no checkbox a prop 'toggleTaskPessoal' será acionada e receberá o 'id' da tarefa que alterou o estado do checkbox
              onChange={() => props.toggleTaskPessoal(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
        </div>
          <div className="btn-group icon-group">
            <button className="tooltip"><TiEdit className="btn-icon edit" onClick={() => setEditing(true)}/><span class="tooltiptext" style={{top: "-30px"}}>Editar<span className="visually-hidden">{props.name}</span></span></button>            
            <button className="tooltip"><RiCloseCircleLine className="btn-icon delete" onClick={() => props.deleteTask(props.id)}/><span class="tooltiptext" style={{top: "-30px"}}>Remover<span className="visually-hidden">{props.name}</span></span></button>            
          </div>
      </div>
    );

    return (
      //utilizamos o conditional rendering do jsx para indicarmos qual UI queremos que seja exibida. se o valor de 'isEditing' for true então a UI de edição de task será exibida, do contrário a UI de visualização padrão será exibida      
      <animated.div style={pop}><li className="todo">{isEditing ? editingTemplate : viewTemplate}</li></animated.div>              
    );
}