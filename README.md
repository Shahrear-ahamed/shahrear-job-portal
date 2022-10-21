# Job Portal

## 3 account for examine

#### <u>Candidate </u>

Email: candidate@gmail.com
Password: Candidate@01

#### <u>Hiring Manager </u>

Email: hmanager@gmail.com
Password: Hmanager@01

#### <u>Admin</u>

Email: admin@gmail.com
Password: Admin123#

## Hiring Manager routes (authorization required)

### GET /manager/jobs

[Get manager jobs](https://shahrear-job-portal.vercel.app/api/v1/manager/jobs)<br>

Get all jobs of this manager who is login or requested

### GET /manager/jobs/:id

[Get manager single jobs](https://shahrear-job-portal.vercel.app/api/v1/manager/jobs/6352633dd834d44b80169b27)<br>
Get a job details by id (with applied candidates information and resume if any) <br>
Authorize the route to check if this job is created by the hiring manager who is trying to see the job details (optional)

### POST /jobs

[Post a new job](https://shahrear-job-portal.vercel.app/api/v1/jobs)<br>
Create A Job <br>
Demo data: <br>

{
"title": "Sr. Nodejs Developer",
"publishedDate": "2022-10-19",
"deadLine": "2022-11-28",
"hiringManager": {
"name": "Shahrear ahamed",
"hUId": "6350af7c4031eeb5a04a3f58"
},
"location": "Cumilla, bangladesh",
"jobType": "On-site",
"salary": 45000,
"description": "GET /manager/jobs/:id Get a job details by id (with applied candidates information and resume if any) Authorize the route to check if this job is created by the hiring manager who is trying to see the job details (optional) PATCH /jobs/:id Update a job Candidate routes GET /jobs Get all Jobs must be able to filter jobs by location, job type, salary range(BONUS) Must be able to sort jobs(BONUS) GET /jobs/:id Get job details with hiring manager info POST /jobs/:id/apply Apply for a job Can’t apply after deadline If already applied, then can’t apply again Can upload a resume(pdf)(BONUS)",
"totalOpening": 1,
"perks": ["Salary review"],
"contactDetails": "its.shahrear@gmail.com"
}

### PATCH /jobs/:id

[Update existing job](https://shahrear-job-portal.vercel.app/api/v1/jobs/6350bd17f57481d23581db94)<br>
Update a job <br>
Demo Data: <br>
{
"totalOpening": 5,
"perks": [
"Certificate",
"Salary review"
]
}

## Candidate routes

### GET /jobs Get all Jobs

[Get All Jobs Link](https://shahrear-job-portal.vercel.app/api/v1/jobs)<br>
A user can get all jobs and sort with salary and opening, also user can search by using location like this.

### GET /jobs/:id

[Get Single Job Link](https://shahrear-job-portal.vercel.app/api/v1/jobs/6352633dd834d44b80169b27)<br>
Get job details with hiring manager info

### POST /jobs/:id/apply

[Apply a single job](https://shahrear-job-portal.vercel.app/api/v1/jobs/6352633dd834d44b80169b27/apply)<br>
User can apply for a job can’t apply after deadline and if already applied, then can’t apply again. for apply a job you need to login first.

## Candidate or Auth routes

### POST /user/signup

[Create a account](https://shahrear-job-portal.vercel.app/api/v1/user/signup)<br>
User can Signup/Register with post request <br>
Demo Data: <br>
{
"userName": "shahrear02",
"email": "test2@gmail.com",
"password": "test@1234",
"firstName": "Shahrear",
"lastName": "Ahamed"
}
user name must be unique otherwise you will get error

### POST /user/login

[Login a user](https://shahrear-job-portal.vercel.app/api/v1/user/login)<br>
User can login <br>
Demo data: <br>
{
"email": "admin@gmail.com",
"password": "Admin123#"
}
no need to add other input

### GET /user/me

[get my credentials](https://shahrear-job-portal.vercel.app/api/v1/user/me)<br>
Get user information by token

{
"id": "1",
"name": "A green door",
"price": "12.50",
"tags": [ "home", "green" ]
}
