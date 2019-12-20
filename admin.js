(function(){
    console.log('Loaded JS!')

    const ably = new Ably.Realtime('<API_KEY>')
    const channel = ably.channels.get('chat-window')

    channel.subscribe('div-hide', message => {
        console.log(message)
        document.querySelector('#hide').innerHTML = `<p>${message.data}</p>`
    })

    channel.subscribe('toggle', message => {
        console.log(message.data)
       document.querySelector('#chat-window').classList.replace(message.data.from, message.data.to)
    })

    ably.connection.on('connected', () => {
        console.log('Successfully connected!')
    })
})()