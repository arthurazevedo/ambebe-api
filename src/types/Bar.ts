export interface Bar {
    id: Number,    
    email: String,
    name: String,
    city: String
    checkins: Number
}

export interface barLogin {
  token: String,
  bar: Bar
}

