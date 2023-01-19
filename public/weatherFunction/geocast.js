const request = require('request')

function geocast (city,callback){
       
    const url = 'http://api.weatherstack.com/current?access_key=b94e5f25c4d28ec40e2ef1cf6f0eafee&query='+ city

    request({url:url, json:true},(error,response)=>{
        if (error) {
           return  callback('Unable to connect to weather service!', undefined)
        }
         else if (response.body.error) {
            return  callback('Unable to find ')
        }
         else {
         callback(undefined, {
            lat :response.body.location.lat,
            long : response.body.location.lon,
            loc:response.body.location.name
        } )
        }
    })

}

// geocast("rajkot",(error,data)=>{
//     if(error){
//         return console.log(error)
//     }else{
//         return  console.log(data)
//     }
// })

module.exports=geocast