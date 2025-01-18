const { EmbedBuilder, Colors } = require('discord.js')

module.exports = (config, client) => {
  const status = queue =>
  `Volume: \`${queue.volume}%\``
client.distube
  .on('playSong', (queue, song) =>
  {
    //console.log(queue)
    queue.textChannel.send({embeds: [new EmbedBuilder().setColor(Colors.Blurple).setDescription(`\*\*Playing\*\* \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
      song.user
    }\n${status(queue)}`)]}
    )
  }
    
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds: [new EmbedBuilder().setColor(Colors.Blurple).setDescription(`${song.name} - \`${song.formattedDuration}\` to the \*\*queue\*\* by ${song.user}`)]})
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [new EmbedBuilder().setColor(Colors.Blurple).setDescription(`\`${playlist.name}\` playlist (${
      playlist.songs.length
    } songs) to \*\*queue\*\*\n${status(queue)}`)]})
  )
  .on('error', (e, queue) => {
    queue.textChannel.send({embeds: [new EmbedBuilder().setColor(Colors.Red).setDescription(`An error encountered: ${e.toString().slice(0, 1974)}`)]})
    console.error(e)
  })
  // .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds: [new EmbedBuilder().setColor(Colors.Red).setDescription(`\*\*No result\*\* found for \`${query}\`!`)]}))

}
