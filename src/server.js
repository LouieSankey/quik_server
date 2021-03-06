const ChatService = require('./chat/chat_service')
const app = require('./app')
const knex = require('knex')
const config = require('./config')

//this line is a temporary fix to 'self signed cert' error
//it should be replaced with a valid ssl certificate when securing the app
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)

var server = require('http').Server(app)

const origin = config.NODE_ENV === 'development' ? "http://localhost:3000" : "https://quik.vercel.app"

var io = require('socket.io')(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    credentials: true
  }
})



server.listen(PORT, () => {
})

io.on('connection', function (socket) {

  socket.on('chat message', function (msgInfo) {
    io.emit('chat message ' + msgInfo.room_id, msgInfo)

    const message = {
      'room_id': msgInfo.room_id,
      'username': msgInfo.username,
      'msg': msgInfo.msg
    }
    ChatService.insertMessage(db, message).catch(error => console.error(error))
  })

  socket.on('request', function (params) {
    io.emit('request ' + params.room_id, params)
  })

  socket.on('disconnect', function () {

  })

})