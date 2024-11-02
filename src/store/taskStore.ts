import { create } from 'zustand';
import { addTask, deleteTask, getTasks, toggleFavoriteTask, updateTaskStatus } from '../api/api';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    favorite: boolean;
}

interface TaskState {
    tasks: Task[];
    currentFilter: string;
    loading: boolean;
    setFilter: (filter: string) => void;
    setLoading: (loading: boolean) => void;
    fetchTasks: () => Promise<void>;
    addTask: (title: string, description: string) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    toggleTaskStatus: (id: number) => Promise<void>;
    toggleFavorite: (id: number) => Promise<void>;
    filteredTasks: () => Task[];
}

const saveTasksToLocalStorage = (tasks: Task[]) => localStorage.setItem('tasks', JSON.stringify(tasks));

const loadTasksFromLocalStorage = (): Task[] => JSON.parse(localStorage.getItem('tasks') || '[]');

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: loadTasksFromLocalStorage(),
    currentFilter: 'all',
    loading: false,

    setFilter: (filter) => set({ currentFilter: filter }),
    setLoading: (loading) => set({ loading }),

    fetchTasks: async () => {
        set({ loading: true });
        try {
            const response = await getTasks();
            const fetchedTasks = response.data.map((item) => ({
                id: item.id,
                title: item.attributes.name || item.attributes.description || 'Без названия',
                completed: item.attributes.status === 'done',
                favorite: false,
            }));
            const favoriteTasks = JSON.parse(localStorage.getItem('favoriteTasks') || '[]');
            const updatedTasks = fetchedTasks.map(task => ({
                ...task,
                favorite: favoriteTasks.some((fav: Task) => fav.id === task.id),
            }));
            saveTasksToLocalStorage(updatedTasks);
            set({ tasks: updatedTasks });
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
        } finally {
            set({ loading: false });
        }
    },

    addTask: async (title, description) => {
        try {
            const newTaskResponse = await addTask({ title, description, completed: false });
            const newTask: Task = {
                id: newTaskResponse.id,
                title: newTaskResponse.attributes.name || title,
                completed: newTaskResponse.attributes.status === 'done',
                favorite: false,
            };
            set((state) => {
                const updatedTasks = [...state.tasks, newTask];
                saveTasksToLocalStorage(updatedTasks);
                return { tasks: updatedTasks };
            });
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    },

    deleteTask: async (id) => {
        try {
            await deleteTask(id);
            set((state) => {
                const updatedTasks = state.tasks.filter((task) => task.id !== id);
                saveTasksToLocalStorage(updatedTasks);
                return { tasks: updatedTasks };
            });
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    },

    toggleTaskStatus: async (id) => {
        const task = get().tasks.find((task) => task.id === id);
        if (task) {
            try {
                await updateTaskStatus(id, !task.completed);
                set((state) => {
                    const updatedTasks = state.tasks.map((task) =>
                        task.id === id ? { ...task, completed: !task.completed } : task
                    );
                    saveTasksToLocalStorage(updatedTasks);
                    return { tasks: updatedTasks };
                });
            } catch (error) {
                console.error('Ошибка при переключении статуса задачи:', error);
            }
        }
    },

    toggleFavorite: async (id) => {
        const task = get().tasks.find((task) => task.id === id);
        if (task) {
            try {
                await toggleFavoriteTask(id, !task.favorite);
                set((state) => {
                    const updatedTasks = state.tasks.map((task) =>
                        task.id === id ? { ...task, favorite: !task.favorite } : task
                    );
                    const favoriteTasks = updatedTasks.filter((task) => task.favorite);
                    localStorage.setItem('favoriteTasks', JSON.stringify(favoriteTasks));
                    saveTasksToLocalStorage(updatedTasks);
                    return { tasks: updatedTasks };
                });
            } catch (error) {
                console.error('Ошибка при переключении избранного:', error);
            }
        }
    },

    filteredTasks: () => {
        const { tasks, currentFilter } = get();
        switch (currentFilter) {
            case 'completed':
                return tasks.filter((task) => task.completed);
            case 'incomplete':
                return tasks.filter((task) => !task.completed);
            case 'favorite':
                return tasks.filter((task) => task.favorite);
            default:
                return tasks;
        }
    },
}));
