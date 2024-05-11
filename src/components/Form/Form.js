import './Form.scss';
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

import {collection, addDoc} from 'firebase/firestore';
import { db } from "../../firebase"; // Import the db instance

function Form({ onAddTask }) {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [saving, setSaving] = useState(false); // State to track saving status

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        if (description === '') {
            setErrorMessage('Enter a description.');
        } else {
            setSaving(true); // Set saving state to true
            try {
                // Save the task to Firestore
                const docRef = await addDoc(collection(db, "taskDB"),{
                    description: description,
                    done: status === 'completed'
                });
                const taskId = docRef.id;
                onAddTask(description, taskId, status);
                setDescription('');
                setStatus('open');
                setErrorMessage('');
                //console.log('id: ', taskId);
            } catch (error) {
                console.error('Error saving task:', error);
                setErrorMessage('Failed to save task. Please try again.');
            } finally {
                setSaving(false);
            }
        }
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <h2>Add a new task:</h2>

            {errorMessage !== '' && (<div>{errorMessage}</div>)}

            <label>
                Description:
                <input
                    type='text'
                    maxLength={150}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </label>
            <label>
                Status:
                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value='open'>Open</option>
                    <option value='completed'>Completed</option>
                </select>
            </label>
            {saving ? (
                <div>Saving...</div>
            ) : (
                <button>Add <FaCirclePlus size={10} /></button>
            )}
        </form>
    );
}

export default Form;
