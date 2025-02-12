import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

// Хранилище пользователей
const users: { name: string }[] = [];

// POST /user - добавление пользователя
app.post('/user', (req: Request, res: Response) => {
    const { name } = req.body;

    // Проверка: имя должно быть передано и не должно быть пустым
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required and should be a non-empty string.' });
    }

    // Добавление пользователя в массив
    users.push({ name: name.trim() });

    res.status(201).json({ message: 'User added successfully', users });
});

// GET /users - получение всех пользователей
app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

// Запуск сервера
if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
