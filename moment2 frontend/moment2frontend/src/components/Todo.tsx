import './Todo.css'
import { useState } from "react";

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
                console.log(response)
                props.update();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // uppdaterar en todo i databasen
    const updateTodo = async (todoId: string) => {
        console.log("uppdaterade: " + todoId);
        // fetch anrop till min backend som lägger till ny todo
        try {
            const response = await fetch(`http://127.0.0.1:3000/updatetodo/${todoId}`, {
                method: "PUT",
                body: JSON.stringify({
                })
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
                <p>Uppdatera jajajajk</p>
            </div>
        </>
    )

}

export default Todo