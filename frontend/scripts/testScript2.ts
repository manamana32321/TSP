import Client from "@/client"
import Position from "../types/game/position"

export default async function Script(client: Client) {
  const gameClasses = client.game.classes
  const baseLevel = new gameClasses.level.GridLevel("Belos", 4, 6)
  const player = new gameClasses.entity.Actor("Mana")
  client.game.playerCharacter = player
  const item1 = new gameClasses.entity.Item("Bow of Iris")
  const item2 = new gameClasses.entity.Item("Jem")
  const startingPosition = new Position(baseLevel, 0, 0)
  player.inventory?.add(item1)
  player.place(startingPosition)
  startingPosition.addEntity(item2)


  let i = await client.dialog(
    `It seems you are using typescript...
    Glad to meet you ${player.name}.
    You are now in ${player.position?.level.name}
    `,
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
    case '201':
      i = await client.dialogWithNext(`
        <div>
          You try to communicate...
          <strong>But the lazy developer did nothing!</strong>
          What a waste of time.
        </div>`
      )
      break
  }

  i = await client.dialog(`Do you want a starter gift?`,
    [
      { selectId: 'Knife', name: 'Knife' },
      { selectId: 'Bow', name: 'Bow' },
      { selectId: 'Shield', name: 'Shield' },
    ]
  )
  const starterGift = new gameClasses.entity.Item(i)
  player.inventory?.add(starterGift)
  await client.dialogWithNext(`Good! You got a new ${starterGift.name}`)
}