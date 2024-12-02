import app from './app'
import mongoose from 'mongoose'
import config from './app/config'


async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string)
    app.listen(config.port, () => {
      console.log(`server is running on the ${config.port}`)
    })
    console.log("connected to the monngose")
  } catch (errror) {
    console.log(errror)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
