
import Todo from './Todo'
import './TodoList.css'
import { useState, useEffect } from "react";
import TodoForm from './TodoForm';
import spinner from '../assets/Spinner-0.7s-200px.svg';

function TodoList() {

  interface TodoInterface {
    _id: any; // gjorde den här till any för ObjectId verkar inte funka
    title: string;
    status: string;
    description: string;
  }

  const [todos, setTodos] = useState<TodoInterface[] | []>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState<boolean>(false);

  useEffect(() => {
    getTodos();
  }, [])

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getTodos = async () => {
    // fetch anrop till min backend
    try {
      setLoadingList(true);

      await delay(2000);
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
      setFetchError("Något gick fel vid hämtning av listan...")
    } finally {
      setLoadingList(false);
    }
  }

  return (
    <>
      {/* Meddelande till användaren om listan inte kan hämtas från api */}
      {
        fetchError && <p className='fetch-info'>{fetchError}</p>
      }
      {/* gjorde TodoList till parent till TodoForm så jag kan anropa funktionen för att updatera listan när formuläret skickas */}
      {/* Gör så formuläret tas bort om fetcherror inte är null efter det ändå inte går att användas */}
      {
        fetchError === null &&
        <TodoForm update={getTodos} />
      }
      {/* Meddelande till användaren som visas medans listan laddas in */}
      {
        loadingList && <div className='fetch-info'><p>Laddar...</p> <img src={spinner} /></div>
        
      }
      <div className='todo-grid'>
        {
          // Kollar så todos inte är tom
          todos.length > 0 ?
          todos.map((todo) => (
            // gjorde article här så key funkar
            <article key={todo._id}>
              <Todo title={todo.title} status={todo.status} description={todo.description} id={todo._id} updateTodoProp={getTodos} />
            </article>
          )) : <p className='fetch-info list-info'>Listan är tom</p>
        }
      </div>
    </>
  )
}

export default TodoList