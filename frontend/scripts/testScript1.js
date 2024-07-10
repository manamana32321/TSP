export default async function Script(client) {
  let i = await client.dialog(
    "Glad to meet you warrior.",
    [
      { selectId: '101', name: 'Greet' },
      { selectId: '102', name: 'Ignore', disabled: true },
      { selectId: '201', name: 'Communicate' },
    ]
  )
  switch (i) {
    case '101':
      i = await client.dialogWithNext(`
        You greet the person infront of you.
        "Hello!"
        However, the person says nothing but leaves a bitter sweet smile.
      `)
      break
    case '102':
      i = await client.dialogWithNext(`
        You try best to ignore the person infront of you.
        However, the person greets you with big smile.
      `)
      break
    case '103':
      i = await client.dialogWithNext(`
        <div>
          You try to communicate...
          <strong>But the lazy developer did nothing!</strong>
          What a waste of time.
        </div>`
      )
      break
  }

  i = await client.dialogWithNext("1")
  i = await client.dialogWithNext("2")
  i = await client.dialogWithNext("3")
}