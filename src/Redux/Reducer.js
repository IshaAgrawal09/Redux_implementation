import { Show_Data } from "./Action";
const inititalState = {
  loggedUsername: "",
  loggedCustomer: "",
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case Show_Data:
      let t = { ...JSON.parse(sessionStorage.getItem("data")) };

      return {
        ...state,
        loggedCustomer: t.customer,
        loggedUsername: t.username,
      };

    default:
      return {
        ...state,
      };
  }
};
export default reducer;
