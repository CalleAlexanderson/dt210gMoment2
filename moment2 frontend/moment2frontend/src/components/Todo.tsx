import './Todo.css'
import { useState } from "react";
import UpdateForm from './UpdateForm';
import FormDataInterface from './Interfaces';

const Todo = (props: any) => {

    const [deleteClass, setDeleteClass] = useState('hidden');
    const [updateClass, setUpdateClass] = useState('hidden');

    // Tar bort en todo från databasen
    const deleteTodo = async (todoId: string) => {
        console.log("tog bort: " + todoId);// fetch anrop till min backend som lägger till ny todo
        try {
            const response = await fetch(`http://127.0.0.1:3000/delete/${todoId}`, {
                method: "DELETE"
            })

            // kollar om anropet var lyckat
            if (!response.ok) {
                throw Error;
            } else {
                // anropar funktionen som skickas i props från TodoList
                props.update();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // uppdaterar en todo i databasen
    const updateTodo = async (data: FormDataInterface) => {

        // fetch anrop till min backend som uppdaterar en todo
        try {
            const response = await fetch(`http://127.0.0.1:3000/updatetodo/${props.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: data.title,
                    status: data.status,
                    description: data.description
                })
            })

            // kollar om anropet var lyckat
            if (!response.ok) {
                throw Error;
            } else {
                // anropar funktionen som skickas i props från TodoList
                props.updateTodoProp();
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <h3>{props.title}</h3>
            <p>{props.status}</p>
            <p>{props.description}</p>
            {/* Knappar som visar divarna som används för uppdatering och bekräfta en delete */}
            <button onClick={() => { setUpdateClass('update-form') }}>Uppdatera</button>
            <button onClick={() => { setDeleteClass('confirm-delete') }}>Ta bort</button>

            {/* Bekräfta delete */}
            <div className={deleteClass}>
                <p>Vill du ta bort: {props.title}</p>
                <button onClick={() => { deleteTodo(props.id) }}>Ja</button>
                <button onClick={() => {
                    setDeleteClass('hidden');
                }}>Nej</button>
            </div>

            <div className={updateClass}>
            <button className='form-close-btn' onClick={() => { setUpdateClass('hidden') }}>X</button>
                <div>
                    <UpdateForm update={updateTodo} title={props.title} status={props.status} />
                </div>
            </div>
        </>
    )

}

export default Todo