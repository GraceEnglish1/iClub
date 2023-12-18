# iClub

iClub is a comprehensive social web application that allows student clubs to promote themselves, find new members and post exciting announcements to existing members.

## Features
### Frontend
Vue has been implemented in the front-end to support HTML pages and AJAX is utilised to ensure the website is reactive to user inputs without reloading the entire page. Email notifications feature has been successfully built with Nodemailer.
### Backend
Node.js is included to run the backend and Express acts as the middleware. Backend routes have been created to control access privileges and to ensure the appropriate information is retrieved from the database.
### Database
The robust mySQL database has been designed in 4th normal form. It is persistent and effectively developed to update based on user changes administered on the client side. GET, POST and DELETE requests are used to receive and modify information in the database.
### Security
Incorporated OAuth 2.0 to access Google APIs and securely support user logins. User passwords are hashed and database inputs are sanitized with the sanitized-html package.
## Photos from Demo
### Login
![image](https://github.com/GraceEnglish1/iClub/assets/100389864/ed350212-8d0e-4809-ba38-75269f6c3f1a)
### Search
![image](https://github.com/GraceEnglish1/iClub/assets/100389864/35328f51-d907-4471-91ee-2c71241a6957)
### Club Page
![image](https://github.com/GraceEnglish1/iClub/assets/100389864/6206e492-fe6e-4ae8-a32b-640447cd0355)
### Profile
![image](https://github.com/GraceEnglish1/iClub/assets/100389864/3c563690-6a59-46aa-af3c-f3605047bbe2)

## Setting Up
Ensure the docker desktop environment is set up.

Step 1: Download the repo in VS code

Step 2: Npm install

Step 3: Start the database `service mysql start`

Step 4: Setup database
```service mysql start
mysql
CREATE DATABASE iclub;
CREATE USER 'grace'@'localhost' IDENTIFIED BY 'grace';
GRANT ALL PRIVILEGES ON iclub.* TO 'grace'@'localhost';
\q
```

## Inputting data into the database
### Backup data
mySQL data dump is in the folder location
sql -> backup.sql
