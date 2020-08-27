import React, {useState} from 'react';


export default function Form(props) {

    const [name, setName] = useState("");

    //função ativada quando o usuário digita no campo input
    //essa função será usada para alterar o state 'name' que, por sua vez, é o estado responsável pelo state do input
    function handleChange(e) {
        setName(e.target.value)
    }


    //função acionada quando o usuário clica no botão 'ADD'
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg visually-hidden">
            Insira uma nova tarefa abaixo.
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
          placeholder="Insira uma nova tarefa"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Adicionar nova tarefa.
        </button>
      </form>
    )
}