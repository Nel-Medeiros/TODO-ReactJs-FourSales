import React, {useState} from 'react';

export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

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
        <div className="btn-group">
          <button 
            type="button" 
            className="btn todo-cancel"
            onClick={() => setEditing(false)}
          >
            Cancelar
            <span className="visually-hidden">editando {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Salvar
            <span className="visually-hidden">a tarefa {props.name}</span>
          </button>
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
          <div className="btn-group">
            <button 
              type="button" 
              className="btn"
              onClick={() => setEditing(true)}
            >
              Editar tarefa <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}
            >
              Deletar tarefa <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
      </div>
    );

    return (
      //utilizamos o conditional rendering do jsx para indicarmos qual UI queremos que seja exibida. se o valor de 'isEditing' for true então a UI de edição de task será exibida, do contrário a UI de visualização padrão será exibida
    <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}