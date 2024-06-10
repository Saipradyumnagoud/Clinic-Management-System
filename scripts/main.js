// Firebase Authentication and Database Handling

// Doctor Login Function
function doctorLogin() {
    var email = document.getElementById('doctorEmail').value;
    var password = document.getElementById('doctorPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById('doctorInfo').style.display = 'block';
            fetchPatientData();
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Receptionist Login Function
function receptionistLogin() {
    var email = document.getElementById('receptionistEmail').value;
    var password = document.getElementById('receptionistPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById('receptionistInfo').style.display = 'block';
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Fetch Patient Data for Doctor
function fetchPatientData() {
    firebase.database().ref('patients').on('value', (snapshot) => {
        var patients = snapshot.val();
        var patientDataDiv = document.getElementById('patientData');
        patientDataDiv.innerHTML = '';

        for (var key in patients) {
            if (patients.hasOwnProperty(key)) {
                var patient = patients[key];
                patientDataDiv.innerHTML += `<div>
                    <h3>Token: ${patient.token}</h3>
                    <p>Name: ${patient.name}</p>
                    <p>Age: ${patient.age}</p>
                    <p>Gender: ${patient.gender}</p>
                </div>`;
            }
        }
    });
}
