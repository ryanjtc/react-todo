import '../Tasks/Task/Task.scss';
import Task from "./Task/Task";

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
    return (
        <>
            <div className={'task-mapContainer'}>
                <h2>These are the tasks:</h2>
                {tasks.length === 0 ? (
                    <>
                        <div>No tasks to display.</div>
                        <br/>
                    </>
                ) : (
                    tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            onStatusChange={onStatusChange}
                            onTaskRemove={onTaskRemove}
                        />
                    ))
                )}
            </div>
            <button onClick={onClearTasks}>Clear Tasks</button>
        </>
    );
}

export default Tasks;
