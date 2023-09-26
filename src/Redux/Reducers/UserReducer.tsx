import { userType } from "../Actions/indexAction"

const initialState: userType[] = []
//     { userId: 1, userName:'amar1@gmail.com', password:'1234'},
//     { userId:2, userName:'amar2@gmail.com', password:'1234'},
//     { userId:3, userName:'amar3@gmail.com', password:'1234'},
//     { userId:4, userName:'amar4@gmail.com', password:'1234'},
// ]

const userReducer = (state: userType[] = initialState, action: any) => {
    switch(action.type){
        case 'ADD_USER': return [...state, action.payload]
        case 'CLEAR_USER': return state = []
        default : return state;
    }
}

export default userReducer;