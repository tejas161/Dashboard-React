const reducer = (state,action) => {
  if(action.type === "Search_Update")
  {
      return {
          ...state,
          userTyped:action.payload.userTyped
      }
  }    return state;

};
export default reducer;