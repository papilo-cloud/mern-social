const app = require('./express')
const config = require('./config/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

main().catch(err => console.error(err))
async function main() {
    await mongoose.connect(config.mongodbUri, {
        dbName: 'mern'
    },
    {
        useFindAndModify: true,
        useCreateIndex: true
    })
}

app.listen(config.port, () => 
console.log('Server running on port', config.port))