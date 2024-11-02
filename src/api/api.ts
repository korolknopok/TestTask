import axios from "axios";

const API_URL = "https://cms.laurence.host/api";

interface Task {
    id : number;
    title: string;
    completed: boolean;
    favorite: boolean;
}

interface ApiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}


interface TaskApiResponse {
    id: number;
    attributes: {
        name: string | null;
        description: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
}

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
};

export const addTask = (task : {title: string, description: string, completed: boolean}) : Promise<TaskApiResponse> =>
    handleRequest(
        axios.post(`${API_URL}/api/tasks`, {
            data: {
                name: task.title,
                description: task.description || '',
                status: task.completed ? 'completed' : 'uncompleted',
            },
        })
    );

export const getTasks = (): Promise<ApiResponse<TaskApiResponse>> =>
    handleRequest(axios.get(`${API_URL}/tasks`));

export const deleteTask = (id: number) : Promise<void> =>
    handleRequest(axios.delete(`${API_URL}/tasks/${id}`));

export const updateTaskStatus = (id: number, completed: boolean): Promise<Task> =>
    handleRequest(axios.put(`${API_URL}/tasks/${id}`, {data: {completed}}));

export const toggleFavoriteTask = (id: number, favorite: boolean): Promise<Task> =>
    handleRequest(axios.post(`${API_URL}/tasks/${id}`, {data: {favorite}}));