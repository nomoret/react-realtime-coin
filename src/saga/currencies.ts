import {
  all,
  fork,
  cancel,
  call,
  put,
  take,
  flush,
  delay,
} from "redux-saga/effects";
import { eventChannel, buffers, Buffer } from "redux-saga";

function subscribe(socket: WebSocket, buffer: Buffer<any>) {
  return eventChannel((emit) => {
    socket.onmessage = (e) => {
      const value: any = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      console.log(value);
      emit(value);
    };

    return () => {};
  }, buffer || buffers.none());
}

function* read(socket: WebSocket) {
  const channel = yield call(subscribe, socket, buffers.expanding(10));
  while (true) {
    const messages = yield flush(channel);

    if (messages.length) {
      yield console.log(messages);
      yield put({
        type: "MESSAGE_SOCKET_REQUEST",
        payload: messages,
      });
    }

    yield delay(2000);
  }
}

function connect() {
  const gdaxSubscribe = {
    type: "subscribe",
    channels: [
      {
        name: "ticker",
        product_ids: ["BTC-USD"],
      },
    ],
  };

  const socket = new WebSocket("wss://ws-feed.gdax.com");

  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      socket.send(JSON.stringify(gdaxSubscribe));
      resolve({ socket });
    };
    socket.onerror = (e) => {
      reject(new Error("websocket error"));
    };
  }).catch((error) => ({ socket, error }));
}

function* flow() {
  while (true) {
    yield take("CONNECT_SOCKET_REQUEST");
    const { socket, error } = yield call(connect);

    yield console.log(socket);
    if (socket) {
      const ioTask = yield fork(handleIO, socket);
      yield take("CLOSE_SOCKET_REQUEST");
      yield cancel(ioTask);
      socket.close();
    } else {
      console.error(error);
    }
  }
}

function* handleIO(socket: WebSocket) {
  yield fork(read, socket);
}

export default function* cuurenciesSaga() {
  yield all([fork(flow)]);
}
