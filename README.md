# RevoBank API
Backend REST API for a simple digital banking system built with NestJS, Prisma ORM, PostgreSQL (Supabase). Deployed on Railway.

The purpose of this project is to learn about how backend system works. This is a milestone 4 assignment.

## Deployment
You can visit this website here

[https://milestone-4-private-production.up.railway.app/](https://milestone-4-private-production.up.railway.app/)

## Tech Stack
- NestJS
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication
- Railway Deployment
- pnpm Package Manager

## Local Development Setup
### 1. Clone Repository
```
git clone https://github.com/Revou-FSSE-Jun25/milestone-4-adsrchve.git
cd milestone-4-adsrchve
```

### 2. Install Dependencies
```
pnpm install
```

### 3. Environment Variables
Create `.env` files 
```
DATABASE_URL=(your database connection)
DIRECT_URL=(your database)
JWT_SECRET=(your secret key)
```

### 4. Run Migration and Start Server
```
pnpm prisma migrate dev
pnpm run start:dev
```

## Authentication API
### Register
POST `/auth/register`
```
{
  "email": "anindya@mail.com",
  "password": "anin123",
  "name": "Anindya"
}
```

### Login
POST `/auth/login`
```
{
  "email": "anindya@mail.com",
  "password": "anin123"
}
```
Response:
```
{
  "access_token": "JWT_TOKEN"
}
```
Use this token for protected routes:
```
Authorization: Bearer JWT_TOKEN
```

## Deployment
The deployment using Railway.

<b> Build Command </b>
```
pnpm install
pnpm prisma generate
pnpm prisma migrate deploy
pnpm run build
```

**Start Command**
```
pnpm run start:prod
```

## Author
**Anindya Nitisara Dwi Sukmawati**<br>
RevoU Fullstack Software Engineering Program