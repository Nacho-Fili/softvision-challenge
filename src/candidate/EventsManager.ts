import {io} from "socket.io-client";

import Candidate from "./types";

interface EventEmitter {
  emit: (event: string, argument: {id: string}) => void;
}
interface EventListener {
  listen: (event: string, handler: (data: Candidate[]) => void) => void;
}

class EventsManager {
  private socket;
  private emitter: EventEmitter;
  private listener: EventListener;
  private static Instance: EventsManager;

  private constructor() {
    this.socket = io("", {transports: ["websocket", "polling", "flashsocket"]});

    this.emitter = {
      emit: (event, argument) => this.socket.emit(event, [argument]),
    };
    this.listener = {
      listen: (event, handler) => this.socket.on(event, handler),
    };
  }

  static Emitter: () => EventEmitter = function (this: EventsManager) {
    if (!EventsManager.Instance) EventsManager.Instance = new EventsManager();

    return EventsManager.Instance.emitter;
  };

  static Listener: () => EventListener = function (this: EventsManager) {
    if (!EventsManager.Instance) EventsManager.Instance = new EventsManager();

    return EventsManager.Instance.listener;
  };
}

export default EventsManager;
