# BackEnd

create .env file and add the code given below

```sh
DATABASE_URL = mysql://nxb210086:demo123@localhost:3306/aution_software
SECRET = 56EF7F3888F7BBE4512375795D11D
```

Change nxb210086 to your local user name, demo 123 to your local password and aution_software to your schema.

once you are done with the env setup, execute the below command

```sh
npx prisma db push
```

Also run the sql script to add the projects.

## Run the application in Development mode

```sh
1. git clone url
2. cd backend
3. npm i
4. npx prisma db push
5. npm start
```

**Thank you!**
