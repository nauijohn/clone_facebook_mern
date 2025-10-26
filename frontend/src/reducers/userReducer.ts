export function userReducer(state = null, action: any) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      return state;
  }
}
