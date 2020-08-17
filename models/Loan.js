const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
    LoanType:{
        type: String,
        required: true
    },
    firstName: { 
        type: String, 
        required: true
    },
    lastName: { 
        type: String, 
        required: true 
    },
    phone:{
        type: Number,
        required: true
    },
    emial:{
        type: String,
        required: true 
    },
    
});

module.exports = mongoose.model('Loan', LoanSchema);