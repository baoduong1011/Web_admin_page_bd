const stateDefault = {
    authAdmin:""
}

const AuthReducer = (state = stateDefault , action) => {
    switch(action.type) {
        case 'PUSH_USERNAME': {
            console.log(action);
        }
        default: return {...state}
    }
}

export default AuthReducer;