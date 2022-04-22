const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const connectionSchema = new Schema({
    topic:{type:String, required:[true,'title is required']},
    title:{type:String, required:[true,'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content:{type:String, required:[true,'content is required'],
    minLength:[10, 'the content should have at least 10 characters']},
    location:{type:String, required:[true,'content is required']},
    when:{type:String, required:[true,'content is required']},
    start_time:{type:String, required:[true,'content is required']},
    end_time:{type:String, required:[true,'content is required']},
    image_url:{type:String, required:[true,'content is required']}

},
    {timestamp:true}    

);

//collection name is connection in database
// const Connection = mongoose.model('Connection',connectionSchema);

module.exports = mongoose.model('Connection',connectionSchema);