export function UPGRADE(client: import('ws').WebSocket) {
  console.log('A client connected')

  client.on('message', (event) => {
    const message = JSON.parse(event.toString())
    const time = Date.now() - message.time
    console.log('Received message:', message, ' Elapsed:', time, 'ms')
    client.send(JSON.stringify({ ...message, time }))
  })

  client.once('close', () => {
    console.log('A client disconnected')
  })
}