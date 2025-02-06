
import Todo from './Todo'
import './TodoList.css'
import { useState, useEffect } from "react";
import TodoForm from './TodoForm';

function TodoList() {

  interface TodoInterface {
    _id: any; // gjorde den här till any för ObjectId verkar inte funka
    title: string;
    status: string;
    description: string;
  }

  const [todos, setTodos] = useState<TodoInterface[] | []>([]);

  useEffect(() => {
    getTodos();
  }, [setTodos])

  const getTodos = async () => {
    console.log("hämtar")
    // fetch anrop till min backend
    try {
      const response = await fetch("http://127.0.0.1:3000/gettodos")

      // kollar om anropet var lyckat
      if (!response.ok) {
        throw Error;
      } else {
        const todosData = await response.json();

        setTodos(todosData);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    {/* gjorde TodoList till parent till TodoForm så jag kan anropa funktionen för att updatera listan när formuläret skickas */}
      <TodoForm update={getTodos} />
      <div className='todo-grid'>
        {
          // Kollar så todos inte är tom
          todos.length > 0 &&
            todos.map((todo) => (
              // gjorde article här så key funkar
              <article key={todo._id}>
                <Todo title={todo.title} status={todo.status} description={todo.description} id={todo._id} updateTodoProp={getTodos}/>
              </article>
            ))
          
        }
      </div>
    </>
  )
}

export default TodoList