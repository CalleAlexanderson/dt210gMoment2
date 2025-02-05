import './Todo.css'

const Todo = (props: any) => {
    return (
        <>
            <h3>{props.title}</h3>
            <p>{props.status}</p>
            <p>{props.description}</p>
        </>
    )

}

export default Todo