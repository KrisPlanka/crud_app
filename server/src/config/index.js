import mongoose from "mongoose";
mongoose.connect('mongodb+srv://kristyaplanka:test1234@cluster0.wdmgsrb.mongodb.net/test')
.then(() => console.log('DB Connected!'))
.catch(() => console.log('DB Error!'));