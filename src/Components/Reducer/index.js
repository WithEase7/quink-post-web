// import ACTION from "./Action"
import {
    USER_LOGGED_IN,
    CLOUDINARY_IMAGE,
    SEARCH_POST,
    CHALLENGE_POST,
    COMMUNITY,
    COMMUNITY_POST,
    TOGGLE_CHAT_CONTACT,
    SELECTED_POST_TYPE,
    SHOW_SEARCH,
    LANGUAGE_PREFERENCE

} from './Action'

const initialState = {
    user: {
        name: " "
    },
    cloudinary: "",
    // searchPost: [],
    SEARCH_POST: "",

    community: [],
    challengePost: [],
    toggleContactReducer: null,
    SELECTED_POST_TYPE: "ARTICLE",
    SHOW_SEARCH: false,
    LANGUAGE_PREFERENCE: "English"
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
            return { ...state, challengePost: Action.payload }

            break;
        case COMMUNITY:
            return { ...state, community: Action.payload }

            break;
        case TOGGLE_CHAT_CONTACT:
            return { ...state, toggleContactReducer: Action.payload }
            break;
        case SELECTED_POST_TYPE:
            return { ...state, SELECTED_POST_TYPE: Action.payload }
            break
        case SHOW_SEARCH:
            return { ...state, SHOW_SEARCH: Action.payload }
            break;
        case SEARCH_POST:
            return { ...state, SEARCH_POST: Action.payload }
        case LANGUAGE_PREFERENCE: {
            return { ...state, LANGUAGE_PREFERENCE: Action.payload }
        }
        default:
            return state;
    }
}
export default rootReducer
