/*
    1. set up ably and create a project
    2. create a channel on your project
    3. create a publisher on admin home-page 1
    4. tie the publisher to a button click event
    5. emit message can might be a css class specific to your application or just message
    6. listen for the message by subscribing to the same channel publishing the event from admin home-page1 (don't bother about the pages being competely different)
    7. on the state change or the message sent from the publish is `hide-div` dynmically hide the div with subscriber
*/



(function(){
    console.log('Loaded JS!')

    const ably = new Ably.Realtime('<API_KEY>')
    const channel = ably.channels.get('chat-window')
    let toggleState = false

    document.querySelector('#toggle ').addEventListener('click', e => {
        if(!toggleState){
            channel.publish('div-hide', 'Please, hide this div')
            channel.publish('toggle', {from : 'show', to: 'hide'})
            toggleState = true
            console.log('I emitted hide')
        }else{
            channel.publish('div-hide', 'Please, show this div')
            channel.publish('toggle', {from : 'hide', to: 'show'})
            console.log('I emitted show')

            toggleState = false
        }
    })

    channel.publish('div-hide', 'I loaded first') 

    ably.connection.on('connected', () => {
        console.log('Successfully connected!')
    })
})()