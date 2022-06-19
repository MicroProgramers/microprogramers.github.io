// Initialize Firebase
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var config = {
    apiKey: "AIzaSyAK4m5zXklFN15tjzj7l_-WEg4hENrzWJE",
    authDomain: "microprogramers-team.firebaseapp.com",
    projectId: "microprogramers-team",
    storageBucket: "microprogramers-team.appspot.com",
    messagingSenderId: "106064785452",
    appId: "1:106064785452:web:f837d91bf3e34971212189",
    measurementId: "G-7BT8WD7QWQ"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

$(document).ready(function () {

    $('#notifs-form-btn').click(function (e) {
        var is_present = false;
        email = $('#notifs-form-input').val();
        if (validateEmail(email)) {
            db.collection('Emails').get().then(function (qs) {
                qs.forEach(function (element) {
                    if (element.data()['ID'] == email) {
                        is_present = true;
                    }
                });

                if (is_present == false) {
                    db.collection("Emails").add({
                        'ID': email,
                    })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            $("#notifs-form-btn").text("Subscribed!");
                            alert('Updates enabled for ${email}');
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                } else {
                    alert('Already subscribed for updates!');
                }
            });

        }
        else {
            alert('Invalid Email');
        }
    });

});
