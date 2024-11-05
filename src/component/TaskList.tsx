import React, {useEffect, useRef, useCallback, useState} from "react";
import { useTaskStore } from "../store/taskStore";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
    const { fetchTasks, toggleTaskStatus, deleteTask, toggleFavorite, filteredTasks } = useTaskStore();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [loading, setLoading] = useState(false);

    const lastTaskElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Loading more tasks...");
                    fetchTasks();
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [fetchTasks]
    );

    useEffect(() => {
        setLoading(true);
        fetchTasks().finally(() => setLoading(false));
    }, [fetchTasks]);

    const tasksToDisplay = filteredTasks();

    const handleToggleFavorite = useCallback((id: number) => {
        setLoading(true);
        toggleFavorite(id).finally(() => setLoading(false));
    }, [toggleFavorite]);

    const handleToggleStatus = useCallback((id: number) => {
        setLoading(true);
        toggleTaskStatus(id).finally(() => setLoading(false));
    }, [toggleTaskStatus]);

    const handleDeleteTask = useCallback((id: number) => {
        setLoading(true);
        deleteTask(id).finally(() => setLoading(false));
    }, [deleteTask]);

    return (
        <div>
            {tasksToDisplay.map((task, index) => (
                <div
                    key={task.id}
                    ref={index === tasksToDisplay.length - 1 ? lastTaskElementRef : null}>
                    <TaskItem
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        favorite={task.favorite}
                        toggleFavorite={() => handleToggleFavorite(task.id)}
                        toggleComplete={() => handleToggleStatus(task.id)}
                        deleteTask={() => handleDeleteTask(task.id)}/>
                </div>
            ))}
            {tasksToDisplay.length === 0 && <div>No tasks available.</div>}
        </div>
    );
}

export default TaskList;
