import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    // Подключение к Redis
    const client = createClient({
        url: 'redis://127.0.0.1:6379'
    });

    client.on('error', (err) => console.error('Redis Client Error', err));

    await client.connect();
    console.log('Connected to Redis');

    // Сохранение ключей с их значениями
    await client.set('name', 'Vladimir');
    await client.set('age', '30');
    await client.set('city', 'Moscow');

    // Чтение и вывод значения по заданному ключу
    const keyToRead = 'name';
    const value = await client.get(keyToRead);
    console.log(`Value for key "${keyToRead}":`, value);

    // Закрытие соединения
    await client.disconnect();
}

manageRedis()
    .then(() => console.log('Redis operations completed'))
    .catch(err => console.error('Error:', err));

module.exports = { manageRedis };
