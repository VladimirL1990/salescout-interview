import mongoose, { Schema, Document } from 'mongoose';

type UserType = {
    name: string;
    email: string;
}

type DuplicatedUsers = {
    email: string;
}

const userSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const User = mongoose.model<UserType & Document>('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    // Подключение к MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('Error connecting to MongoDB:', err));

    // Очистка коллекции (для тестирования)
    await User.deleteMany({});

    // Добавление новых пользователей
    const newUsers = [
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
        { name: 'Charlie', email: 'alice@example.com' }, // Дублирующийся email
        { name: 'Dave', email: 'dave@example.com' },
        { name: 'Eve', email: 'eve@example.com' },
        { name: 'Frank', email: 'bob@example.com' }     // Дублирующийся email
    ];
    await User.insertMany(newUsers);

    // Поиск дублирующихся email
    const duplicatedEmails = await User.aggregate([
        {
            $group: {
                _id: "$email",
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gt: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                email: "$_id"
            }
        }
    ]);

    // Закрытие соединения
    await mongoose.connection.close();

    return duplicatedEmails;
}

manageUsers()
    .then(duplicates => console.log('Duplicated emails:', duplicates))
    .catch(err => console.error('Error:', err));

module.exports = { manageUsers };
