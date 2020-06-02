import axios from 'axios'

export const api = axios.create({
  baseURL: '/api'
})

// Use these when adding something to all requests
// e.g. Authorization header with token
api.interceptors.request.use(function (config)  {
  return config
})

// Use these when taking something from all requests
// e.g. authToken sent back from request
api.interceptors.response.use(function (response) {
  return response 
})

export default api

export class WS {
  constructor(channel, params){
    this.channel = channel
    this.params = params
    this.socket = this.ws()
    this.setup()
  }

  setup() {
    this.socket.onopen = (res) => {
      res = JSON.stringify(res)

      // run callback if it has been declared
      this.onOpen && this.onOpen(res)

      // set websocket up to listen to the correct channel
      const setupDetails = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: this.channel,
          ...this.params
        }),
      }
      this.socket.send(JSON.stringify(setupDetails))
    }

    this.socket.onmessage = (res) => {
      res = JSON.parse(res.data)

      // when server welcomes you
      if(res.type === "welcome"){
        this.onWelcome && this.onWelcome(res)
      }

      // When subscription is completely initialized
      else if(res.type === "confirm_subscription") {
        this.onSubscribe && this.onSubscribe(res)

      // When server sends a ping
      } else if(res.type === "ping") {
        this.onPing && this.onPing(res)

      // When server sends a message
      } else {
        this.onMessage && this.onMessage(res.message)
      }
    }

    // when socket is closed run callback
    this.socket.onclose = (res) => {
      res = JSON.parse(res.data)
      this.onClose && this.onClose(res)
    }
  }

  ws() {
    const protocol = `${window.location.protocol.replace(/^http/, 'ws')}//`
    const hostname = window.location.hostname
    const socketURL = protocol + hostname + ':3000' + '/ws'
    return new WebSocket(socketURL)
  }
}
