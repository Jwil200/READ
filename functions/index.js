const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const stripe = require("stripe")
("sk_test_51Me1uSKEBCZYewMaSH4CpulezbfPX5g28jmFytcejw8mTd7ebj0hDqTYdXL1i7OrmpIxm8c2aRRpb7gkUGO1EfIn00b9CxL3LD");
exports.completePaymentWithStripe = functions.https.onRequest((request, 
    response) =>{
    stripe.charges.create({
        amount:request.body.amount,
        currency:request.body.currency,
        source:'tok_mastercard'
    }).then(charge => {
        response.send(charge)
    }).catch(error => {
        console.log(error);
    });
})