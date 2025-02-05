
import Todo from './Todo'
import './TodoList.css'

function TodoList() {
  return (
    <>
      <div className='todo-grid'>
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </div>
    </>
  )
}

export default TodoList