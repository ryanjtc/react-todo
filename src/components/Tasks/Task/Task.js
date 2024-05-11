import './Task.scss';
/*button icons*/
import {GoArrowSwitch, GoTasklist} from "react-icons/go";
import { IoIosRemoveCircleOutline } from "react-icons/io";
/*status icons*/
import { RiTaskLine } from "react-icons/ri"; //open
import { RiTaskFill } from "react-icons/ri"; //completed

//firestore imports for the status updates
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from '../../../firebase';


function Task(props) {

    const handleStatusClick = async () => {
        const id = props.task.id;
        const taskRef = doc(db, "taskDB", id);
        try {
            await updateDoc(taskRef, {
                done: !props.task.done
            });
            props.onStatusChange(id);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }

    const handleRemoveClick = async () => {
        const id = props.task.id;
        const taskRef = doc(db, "taskDB", id);
        try {
            await deleteDoc(taskRef);
            props.onTaskRemove(id);
        } catch (error) {
            console.error('Error removing task:', error);
        }
    }

    return (
        <div className={'taskContainer'}>
            <div>
                <h3><GoTasklist size={30}/> {props.task.description}</h3>
                <hr/>
                <div>Id: {props.task.id}</div>
                <div className={'status'}>
                    Status: {props.task.done ? (
                    <>
                        <RiTaskFill size={25}/> Completed
                    </>
                ) : (
                    <>
                        <RiTaskLine size={25}/> Open
                    </>
                )}
                </div>
            </div>
            <hr/>
            <div className={'buttonContainer'}>
                <hr/>
                <button onClick={handleStatusClick}><GoArrowSwitch/> Change Status</button>
                <button style={{backgroundColor: 'red', color: 'black'}} onClick={handleRemoveClick}><IoIosRemoveCircleOutline/> Remove Task</button>
            </div>
        </div>
    );
}

export default Task;