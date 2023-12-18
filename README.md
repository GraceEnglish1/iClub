# iClub

## Setting Up
Ensure the docker desktop environment is set up.

Step 1: Download the repo in VS code

Step 2: Npm install

Step 3: Start the database `service mysql start``

Step 4: Setup database
```service mysql start
mysql
CREATE DATABASE iclub;
CREATE USER 'grace'@'localhost' IDENTIFIED BY 'grace';
GRANT ALL PRIVILEGES ON iclub.* TO 'grace'@'localhost';
\q
```

## Inputting data into the database
Option 1: Backup data
Mysql dump is in the folder location
sql -> backup.sql

Option 2: Run database sql files
cd sql
mysql -u grace -p iclub < database.sql;
mysql -u grace -p iclub < data.sql;
password: grace
