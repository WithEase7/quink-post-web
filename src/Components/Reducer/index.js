// import ACTION from "./Action"
import {
    USER_LOGGED_IN,
    CLOUDINARY_IMAGE,
    SEARCH_POST,
    CHALLENGE_POST,
    COMMUNITY,
    COMMUNITY_POST,
    TOGGLE_CHAT_CONTACT
} from './Action'

const initialState = {
    user: {
        name: " "
    },
    cloudinary: "",
    searchPost: [],
    community:[],
    challengePost:[],
    toggleContactReducer:null
}

const rootReducer = (state = initialState, Action) => {
    switch (Action.type) {
        case USER_LOGGED_IN:

            return { ...state, user: Action.payload }
            break;

        case CLOUDINARY_IMAGE:
            return { ...state, cloudinary: Action.payload }
        break;
        case SEARCH_POST:
            return { ...state, searchPost: Action.payload }

        break;
        case CHALLENGE_POST:
            return {...state,challengePost:Action.payload}

        break;
        case COMMUNITY:
            return {...state,community:Action.payload}

          break;
        case TOGGLE_CHAT_CONTACT:
          return {...state,toggleContactReducer:Action.payload}


        default:
            return state ;
    }
}
export default rootReducer
