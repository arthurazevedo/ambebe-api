export interface User {
    id: Number,
    name: String,
    username: String,
    email: String,
    points: Number,
    city: String
    age: Number
}

export interface UserLogin {
  token: String,
  user: User
}

