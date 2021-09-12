import Startup from './app';

let port = process.env.PORT|| '3050';

Startup.app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})