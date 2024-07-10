export default function Script(client) {
  client.log("Test Script 1 is running")
  client.print("Hi")
  client.dialog(
    "Glad to meet you warrior.",
    [
      {id: 1, selectId: 101, name: 'Greet', disabled: false},
      {id: 2, selectId: 102, name: 'Ignore', disabled: true},
      {id: 3, selectId: 201, name: 'Communicate', disabled: false},
    ]
  )
}