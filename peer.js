var peer = new Peer()
let sendmessage

const addMessage = (messageString) => {
  const ele = document.getElementById("board")
  const pele = document.createElement("p")
  pele.innerText = messageString
  // add classnames and style based on `messageString

  ele.appendChild(pele)
}

const getMessageStore = () => JSON.parse(localStorage.getItem("store"))

const storeMessage = (message) => {
  const store = getMessageStore()
  // TODO: use the actual message
  store.append({
    sender: "Nobody",
    body: data,
    time: new Date().toLocaleString(),
  })
}

const makeMessenger = (connection) => (messageText) =>
  connection.send(messageText)

const sendMessage = (messageText) => {
  // add message
  addMessage(messageText)
  // storeMessage
  // storeMessage(messageText)
  // send message
  sendmessage(messageText)
}

const makeSender = (conn) => {
  return
}

const handleMessageRecieved = (messageText) => {
  // add message
  addMessage(`*#* ${messageText}`)
  // storeMessage
  // storeMessage(messageText)
}

if (!getMessageStore()) localStorage.setItem("store", JSON.stringify([]))

const handleconnect = (id) => {
  let conn = peer.connect(id)

  conn.on("open", function () {
    sendmessage = makeMessenger(conn) // make the connection globally available through closure
    conn.on("data", function (data) {
      handleMessageRecieved(data)
    })
  })
}

peer.on("open", function (id) {
  const ele = document.getElementById("conid")
  ele.innerHTML = `Your connection string is   <strong>${id}</strong>`
  console.log(id)
})

peer.on("connection", function (connection) {
  sendmessage = makeMessenger(connection)
  console.log({ connectionObject: connection })
  connection.on("data", function (data) {
    console.log(data)
    handleMessageRecieved(data)
  })
})

// Include media
// const canvas = document.querySelector("canvas")

// const stream = canvas.captureStream()
// stream.getTracks().forEach((track) => {
//   peer.call()
// })
