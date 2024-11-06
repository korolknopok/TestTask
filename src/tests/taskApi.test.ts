import { addTask as apiAddTask, getTasks, toggleFavoriteTask } from "../api/api";
import { useTaskStore } from "../store/taskStore";

jest.mock('../api/api', () => ({
    getTasks: jest.fn(),
    addTask: jest.fn(),
    toggleFavoriteTask: jest.fn(),
}));

describe('Test Store', () => {
    const tasksFromApi = [
        {
            id: 1,
            attributes: {
                name: 'Test Task 1',
                description: 'Description 1',
                status: 'incomplete',
                createdAt: new Date('2000-01-01'),
                updatedAt: new Date('2000-01-02'),
            }
        },
        {
            id: 2,
            attributes: {
                name: 'Test Task 2',
                description: 'Description 2',
                status: 'done',
                createdAt: new Date('2000-01-03'),
                updatedAt: new Date('2000-01-04'),
            }
        }
    ];


    const favoriteTasksMock = [{ id: 1 }];

    beforeEach(() => {
        localStorage.setItem('favoriteTasks', JSON.stringify(favoriteTasksMock));
        useTaskStore.setState({ tasks: [], currentFilter: 'all', loading: false });
    });

    it('should fetch tasks and mark the correct ones as favorite', async () => {
        (getTasks as jest.Mock).mockResolvedValue({ data: tasksFromApi });

        const { fetchTasks } = useTaskStore.getState();
        await fetchTasks();

        const { tasks } = useTaskStore.getState();
        expect(tasks).toHaveLength(2);
        expect(tasks[0].id).toBe(1);
        expect(tasks[0].favorite).toBe(true);
        expect(tasks[1].id).toBe(2);
        expect(tasks[1].favorite).toBe(false);
    });

    it('should add a new task and not mark it as favorite', async () => {
        const newTaskResponse = {
            id: 3,
            attributes: {
                name: 'New Task',
                description: 'Task description',
                status: 'incomplete',
                createdAt: new Date('2000-01-03'),
                updatedAt: new Date('2000-01-04'),
            }
        };

        (apiAddTask as jest.Mock).mockResolvedValue(newTaskResponse);

        const { addTask: storeAddTask } = useTaskStore.getState();
        await storeAddTask('New Task', 'Task description');

        const { tasks } = useTaskStore.getState();
        expect(tasks).toHaveLength(1);
        expect(tasks[0].id).toBe(3);
        expect(tasks[0].favorite).toBe(false);
    });

    it('should toggle the favorite status of a task and update local storage', async () => {
        useTaskStore.setState({
            tasks: [
                {id: 1, title: 'Tasks 1', completed: false, favorite: false, createdAt: new Date('2000-01-03')},
            ]
        });

        (toggleFavoriteTask as jest.Mock).mockResolvedValue({});

        const { toggleFavorite } = useTaskStore.getState();
        await toggleFavorite(1);

        const { tasks } = useTaskStore.getState();
        expect(tasks[0].favorite).toBe(true);

        const favoriteTasksInStorage = JSON.parse(localStorage.getItem('favoriteTasks') || '[]');
        expect(favoriteTasksInStorage).toHaveLength(1);
        expect(favoriteTasksInStorage[0].id).toBe(1);
    });
});
