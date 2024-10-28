import { defineStore } from 'pinia';

interface State {
  socket: any
}

export const useSocketStore = defineStore("socket", {
    state: () : State => {
      return {
        socket : new WebSocket("wss://158.220.125.181:8080/echo") ,
      };
    },
    getters:{
      getSocket(state)
      {
        return state.socket
      }
    }
});