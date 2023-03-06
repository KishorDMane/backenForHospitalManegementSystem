****appointments****
1)To get all appointments:
GET    /Appointment/ 
2)To get a single appointment by ID:
GET    /Appointment/:id

3)To get appointments by doctor ID:
GET    /Appointment/doctor/:id

4)To get appointments by patient  ID:
GET    /Appointment/patient/:id

5)To create a new appointment:
POST /Appointment/
body = {
    "dateTime": "2023-03-01 10:00:00",
    "patientName": "kumer mane",
    "doctorId": 1,
    "patientId": 2,
    "note": "Checkup"
}

6)To update an appointment:
PUT /Appointment/:id
body = {
    "dateTime": "2023-03-01 10:00:00",
    "patientName": "kumer mane",
    "doctorId": 1,
    "patientId": 2,
    "note": "Checkup"
}

7)To delete an appointment:
DELETE /Appointment/:id





******************doctors*****************;

1)get all doctors?
GET /doctor
2)get all doctors by id
GET /doctor/:id
3)Create a new doctor
4)Get By department id 
GET doctor/Department/:id
5)Get By Email
 
POST /doctor

body =
{
    
    "departmentId": 1,
    "name": "Dr. sunil kumar",
    "specialization": "Pediatrics",
    "availability": true,
    "qualifications": "MD, FAAP",
    "experience": "5+ years",
    "img": "https://example.com/doctors/jane-smith.jpg",
    "rating": 4.9,
  },

4)Update a doctor
PUT /doctor/:id;
{
    "doctorId": 1,
    "departmentId": 1,
    "name": "Dr. sunil kumar",
    "specialization": "Pediatrics",
    "availability": true,
    "qualifications": "MD, FAAP",
    "experience": "5+ years",
    "img": "https://example.com/doctors/jane-smith.jpg",
    "rating": 4.9,
  },


5)Delete a doctor
DELETE /doctor/:id
note You cannot delete doctor if thear is appointment associeted with that doctore 
to stop accesing someone to yse our system you need to delete login credential of perticular user




******************patient*****************;

1)get all patient?
GET /patient

2)get all patient by id
GET /patient/:id

3)Create a new patient
POST /doctor

body =
{
    
    
    "name": "Dr. sunil kumar",

    "email": "XYZ@gmail.com",
  
    "dob": 4.9,
  }

4)Update a patient
PUT /patient/:id;
{
    
    
    "name": "Dr. sunil kumar",

    "email": "XYZ@gmail.com",
  
    "dob": 4.9,
  }


5)Delete a patient
DELETE /patient/:id




******************Signup*****************;

3)Create a new user
POST /auth/register

body =
{
  "email":"kishor3@gmail.com",
  "first_name":"Kishor",
  "last_name":"mane",
  "password":"123456789"
}

**************Login************
POST  /auth/login/

body= {
  "email":"kishor3@gmail.com",
  "password":"123456789"
}