import React, { useEffect, useRef, useCallback, useState } from "react";
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
                if (entries[0].isIntersecting && !loading) {
                    console.log("Loading more tasks...");
                    fetchTasks();
                }
            });
            if (node) observerRef.current.observe(node);
        }, [fetchTasks, loading]);

    useEffect(() => {
        setLoading(true);
        fetchTasks().finally(() => setLoading(false));
    }, [fetchTasks]);

    const tasksToDisplay = filteredTasks();

    const handleToggleFavorite = useCallback(async (id: number) => {
        setLoading(true);
        try {
            await toggleFavorite(id);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setLoading(false);
        }
    }, [toggleFavorite]);

    const handleToggleStatus = useCallback(async (id: number) => {
        setLoading(true);
        try {
            await toggleTaskStatus(id);
        } catch (error) {
            console.error("Error toggling status:", error);
        } finally {
            setLoading(false);
        }
    }, [toggleTaskStatus]);

    const handleDeleteTask = useCallback(async (id: number) => {
        setLoading(true);
        try {
            await deleteTask(id);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false);
        }
    }, [deleteTask]);

    return (
        <div>
            {loading}
            {tasksToDisplay.length === 0 && !loading && <div>No tasks available.</div>}
            {tasksToDisplay.map((task, index) => (
                <div
                    key={task.id}
                    ref={index === tasksToDisplay.length - 1 ? lastTaskElementRef : null}>
                    <TaskItem
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        favorite={task.favorite}
                        toggleFavorite={handleToggleFavorite}
                        toggleComplete={handleToggleStatus}
                        deleteTask={handleDeleteTask} />
                </div>
            ))}
        </div>
    );
}

export default TaskList;
