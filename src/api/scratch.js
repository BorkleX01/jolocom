
b = require('./qasurvey-backend.js');
b.submitAnswer(-666, 'Yes').catch(console.error)
//b.submitAnswer(20, 'No').catch(console.error)
//b.submitAnswer(20, 'No').catch(console.error)

//b.submitAnswer(22, 'Yes').then(console.log).catch(console.error)
//b.submitAnswer(22, 'No').then(console.log).catch(console.error)

//b.fetchRoom(20).then((r) => b.submitAnswer(r.id, 'Yes')).then(console.log).catch(console.error)
//b.fetchRoom(20).then((r) => b.submitAnswer(r.id, 'No')).then(console.log).catch(console.error)
//b.fetchRoom(20).then((r) => b.submitAnswer(r.id, 'No')).then(console.log).catch(console.error)
//b.fetchRoom(20).then((r) => b.submitAnswer(r.id, 'No')).then(console.log).catch(console.error)
//b.fetchRoom(20).then(console.log).catch(console.error)
//b.fetchRoom(20).then(console.log).catch(console.error)
//b.fetchRoom(21).then(console.log).catch(console.error)

//b.fetchRoom(22).then(console.log).catch(console.error)
//b.fetchRoom(23).then(console.log).catch(console.error)
//b.fetchRoom(24).then(console.log).catch(console.error)

//b.fetchRoom(46).then(console.log).catch(console.error)

//b.submitAnswer(1337, 'Yes').catch(console.error)
//b.submitAnswer(1337, 'Maybe').catch(console.error) //console.log(roomId, room, answer, answers)
//b.submitAnswer(1337, 'Yes').catch(console.error)


//b.fetchRoom(1337).then(console.log).catch(console.error)
b.fetchRoom(-666).then(console.log).catch(console.error)



//delete b;

//<script src="https://gist.github.com/mnzaki/1d4d93e73063f8c7cf0ad6edcba43dde.js"></script>


//any room number modulus 5 will associate with the list of questions
//negative numbers will not match with an quiz but will still record in memory

//All requests have a random chance of failing

Some sort of timeout
