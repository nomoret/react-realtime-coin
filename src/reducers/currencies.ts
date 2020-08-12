export const CONNECT_SOCKET_REQUEST = "CONNECT_SOCKET_REQUEST" as const;
export const MESSAGE_SOCKET_REQUEST = "MESSAGE_SOCKET_REQUEST" as const;
export const CLOSE_SOCKET_REQUEST = "CLOSE_SOCKET_REQUEST" as const;

interface BaseAction {
  type: string;
  payload?: any;
}

export interface currenciesState {
  payload?: Array<any>;
}

const initialState: currenciesState = {
  payload: [],
};

export const currenciesReducer = (
  state = initialState,
  { type, payload }: BaseAction
) => {
  switch (type) {
    case CONNECT_SOCKET_REQUEST:
      return { ...state, ...payload };
    case MESSAGE_SOCKET_REQUEST: {
      return { ...state, payload };
    }
    case CLOSE_SOCKET_REQUEST: {
      return { ...state, value: null };
    }
    default:
      return state;
  }
};
