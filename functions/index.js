const functions = require("firebase-functions");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const stripe = require("stripe")
("sk_test_51MnuFXEtUzCDwLJQrM1xPClKwS9mUJrqsUDnaRYtdRYkVf9fJF65Kzug2LQXiBw5hzin2kP8xCH4jk7YWgVPuVq200Hh3uUBS5");
exports.createEmphemeralKey = functions.https.onRequest((request, response) => {
    stripe.ephemeralKeys.create({
        customer: request.body.customer,
    }, {apiVersion: '2022-11-15'})
    .then(ephemeralKey => {
        response.send(ephemeralKey)
    }).catch(error => {
        console.log(error);
    });
});
exports.createPaymentIntent = functions.https.onRequest((request, response) => {
    stripe.paymentIntents.create({
        amount:request.body.amount,
        currency:request.body.currency,
        customer:request.body.customer,
        payment_method_types:request.body.payment_method_types,
    }).then(paymentIntent => {
        response.send(paymentIntent)
    }).catch(error => {
        console.log(error);
    });
});
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