import './App.scss'
import {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import {Route, Routes} from "react-router-dom";
import Help from "./pages/Help";
import PageNotFound from "./pages/PageNotFound";
import HelpAdd from "./pages/HelpPageComponents/HelpAdd";
import HelpRemove from "./pages/HelpPageComponents/HelpRemove";
import HelpChange from "./pages/HelpPageComponents/HelpChange";
import HelpIntro from "./pages/HelpPageComponents/HelpIntro";
//firebase imports
import {collection, deleteDoc, getDocs} from 'firebase/firestore';
import {db} from './firebase';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    //load the data from the firestore database
    useEffect(() => {
        //IIFE - Immediately Invoked Function Expression
        (async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "taskDB"));
                const fetchedTasks = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const handleClearTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "taskDB"));
            const deletePromises = querySnapshot.docs.map(async doc => {
                await deleteDoc(doc.ref);
            });
            await Promise.all(deletePromises);
            setTasks([]);
        } catch (error) {
            console.error("Error clearing tasks:", error);
        }
    };

    const handleStatusChange = (id) => {
        const updatedTasks = [...tasks];
        updatedTasks.forEach((task) => {
            if (task.id === id) {
                task.done = !task.done;
            }
        });
        setTasks(updatedTasks);
    }

    const handleTaskRemove = (id) => {
        const filteredTasks = tasks.filter(
            (task) => task.id !== id
        );
        setTasks(filteredTasks);
    }

    //Adding a new task
    const handleAddTask = (description, taskId, status) => {
        setTasks([
            ...tasks,
            {
                description: description,
                id: taskId,
                done: status === 'completed'
            }
        ]);
    }

    return (
        <>
            <Header />
            <div className="app-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Routes>
                        <Route path={'/'} element={
                            <div className="tasks-container">
                                <Tasks
                                    tasks={tasks}
                                    onStatusChange={handleStatusChange}
                                    onTaskRemove={handleTaskRemove}
                                    onClearTasks={handleClearTasks}
                                />
                            </div>
                        }/>
                        <Route path={'/add'} element={
                            <div className="form-container">
                                <Form onAddTask={handleAddTask}/>
                            </div>
                        }/>
                        <Route path={'/help'} element={<Help/>}>
                            <Route path={''} element={<HelpIntro/>}/>
                            <Route path={"add"} element={<HelpAdd/>}/>
                            <Route path={"remove"} element={<HelpRemove/>}/>
                            <Route path={"change"} element={<HelpChange/>}/>
                        </Route>
                        <Route path={'*'} element={<PageNotFound/>}/>
                    </Routes>
                )}
            </div>
        </>
    );
}

export default App;
