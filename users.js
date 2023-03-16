import bcrypt from 'bcrypt';


const users = [{
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10)
    }, {
        name: 'Chester',
        email: 'chester@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users