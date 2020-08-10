export const CONNECT_SOCKET_REQUEST = "CONNECT_SOCKET_REQUEST" as const;

interface BaseAction {
  type: string;
  payload?: any;
}

const initialState = {};

export const currenciesReducer = (
  state = initialState,
  { type, payload }: BaseAction
) => {
  switch (type) {
    case CONNECT_SOCKET_REQUEST:
      return { ...state, ...payload };

    default:
      return state;
  }
};
