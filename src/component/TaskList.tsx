import React, { useEffect, useRef, useCallback } from "react";
import { useTaskStore } from "../store/taskStore";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
    const { fetchTasks, toggleTaskStatus, deleteTask, toggleFavorite, filteredTasks } = useTaskStore();
    const observerRef = useRef<IntersectionObserver | null>(null);

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
        fetchTasks();
    }, [fetchTasks]);

    const tasksToDisplay = filteredTasks();

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
                        toggleFavorite={() => toggleFavorite(task.id)}
                        toggleComplete={() => toggleTaskStatus(task.id)}
                        deleteTask={() => deleteTask(task.id)}/>
                </div>
            ))}
            {tasksToDisplay.length === 0 && <div>No tasks available.</div>}
        </div>
    );
}

export default TaskList;
