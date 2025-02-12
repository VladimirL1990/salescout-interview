import axios from 'axios';

type APIResponseType = {
    id: number;
    userId: number;
    title: string;
    body: string;
}

async function fetchLongPosts(): Promise<APIResponseType[]> {
    try {
        // Делаем запрос к JSONPlaceholder API
        const response = await axios.get<APIResponseType[]>('https://jsonplaceholder.typicode.com/posts');

        // Фильтруем посты, где длина body больше 100 символов
        const longPosts = response.data.filter(post => post.body.length > 100);

        return longPosts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

module.exports = { fetchLongPosts };
