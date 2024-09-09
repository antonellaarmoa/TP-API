export default (state, action) => {
   switch (action.type) {
    case 'SET_WATCHLIST':
      return {
        ...state,
        watchlist: action.payload,
      };
    case 'SET_WATCHED':
      return {
        ...state,
        watched: action.payload,
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'ADD_MOVIE_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_MOVIE_FROM_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case 'ADD_MOVIE_TO_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.some(movie => movie.id === action.payload.id)
          ? state.watchlist
          : [action.payload, ...state.watchlist],
      };
    case 'REMOVE_MOVIE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== action.payload),
      };
    case 'ADD_MOVIE_TO_WATCHED':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };
    case 'MOVE_TO_WATCHLIST':
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
      };
    case 'REMOVE_FROM_WATCHED':
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};
