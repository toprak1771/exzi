Project Setup
TR
Öncelikle .env dosyası ekleyerek burada DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
Kendi postgresql bilgilerimizle dolduruyoruz.
Daha sonra jwt işlemleri için SECRET_KEY=****** ekliyoruz.
Database’e migrate çıkmak için npx prisma migrate dev --name init komutunu kullanıyoruz.

Projeyi başlatmadan önce bilgisayara docker’ı kurarak docker-compose.yaml dosyasındaki redisi ayağa kaldırmak için docker-compose up -d redis   metodunu kullanıyoruz.
Redis container ayağa kalktıktan sonra npm run dev ile projeyi ayağa kaldırıyoruz.


Create User and Login
/auth/register apisi ile 

{
    "name":"Test 2",
    "surname":"Test 2",
    "password":"123456",
    "identity_no":"123453434",
    "total_account":3000,
    "email":"test1@mail.com",
    "amount":1500
    //"percentage":24
}

Body ile kullanıcı kayıt edebiliyoruz, arka tarafda bu kullanıcı kayıt edilirken amount veya percentage’ye göre mod hesabına gidecek parayı ve mod tipini belirliyor.

/auth/login apisi ile 
{
   
    "password":"123456",
    "email":"toprak1734@test.com"
}

Giriş yapabiliyoruz ve token alabiliyoruz, portfolio apilerinde bu token ile kullanıcıyı direkt bularak ilgili kullanıcının datasını güncelliyor.

Portfolio

Create Portfolio
/portfolio/create apisi ile Authorization’a Bearer token ekleyerek gönderilen bu istekde 
{
   "portfolio":{
    "BTC":22,
    "ETH":17
   }
}

Örnek body ile ilgili kullanıcının database’de portfolio’su oluşuyor ve data redis cacheleniyor.

Update Portfolio
/portfolio/update apisi ile Authorization’a Bearer token ekleyerek gönderilen bu istekde 
{
   "portfolio":{
    "BTC":17,
    "DASH":35
   }
}

Body ile ilgili kullanıcının portfolio’su güncellenerek, update edilen data redis’de de güncelleniyor.

Get All Portfolio
/portfolio/getAll ile tüm kullanıcılara ait tüm portfolio datası çekilebiliyor.Bunu bir admin yapacağını düşündüğüm için su an bir token göndermeye gerek yok daha sonra admin tokeni ile yetkilendirmede update edilebilir.
Bu datalarda redis'de data varsa cachelenen data olarak ordan geliyor yoksa databaseden geliyor.

Mock Data Transaction
/transaction apisi ile arka tarafda kullanıcılara ait oluşturulmuş işlem mock dataları çekilebilecek.

Analythics
/auth/analytics apisi ile kullanıcıların hangi mod tipinde ve gelirlerini görüntülemek için tüm kullanıcı datasını çekmeye sağlayan api.

Simulator
controllers dosyası içinde yazdığım simulatorMod adlı fonksiyon öncelikle tüm kullanıcıların sıfırlanmış hesaplarıyla ilgili amount veya percentage ile tekrar hesapların tutarını belirliyor,Daha sonra OOP prensipleri ile User sınıfından yeni random kullanıcılar üreterek bunları db’ye kaydediyor.
Bu kullanıcıların her 5 saatde bir mod_type’leri ile beraber gelirlerini hesaplayıp mod_income’a aktarıyor ve mail atıyor(sendgrid yapısını kullandım,key ekleyerek çalıştırılabilir.
Şu an key sildiğim için yorum satırında bu kısım.) Daha sonra her kullanıcının hesaplarını her ay bunu yapacak şekilde dengeleyip toplam hesaba aktarıyor.


------------------------------------------------------------------------------
EN

Project Setup
First, we add a .env file and fill in the PostgreSQL information with our own credentials as follows:

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
Next, we add SECRET_KEY=****** for JWT operations.

To run the database migrations, we use the following command:

npx prisma migrate dev --name init
Before starting the project, install Docker on your computer and use the following command to start the Redis container from the docker-compose.yaml file:

docker-compose up -d redis
Once the Redis container is up, we start the project with:
npm run dev

Create User and Login
/auth/register API
We can register a user by sending a POST request with the following body:
{
    "name": "Test 2",
    "surname": "Test 2",
    "password": "123456",
    "identity_no": "123453434",
    "total_account": 3000,
    "email": "test1@mail.com",
    "amount": 1500
}
On the backend, when registering the user, the amount or percentage will determine how much of the money goes into the mod account and the mod type.

/auth/login API
Users can log in by sending a POST request with the following body:
{
    "password": "123456",
    "email": "toprak1734@test.com"
}
This will return a token, and for portfolio APIs, the token is used to find the user and update their data accordingly.

Here's the full translation of your provided text into English:

Project Setup
First, we add a .env file and fill in the PostgreSQL information with our own credentials as follows:

makefile
Kodu kopyala
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
Next, we add SECRET_KEY=****** for JWT operations.

To run the database migrations, we use the following command:

csharp
Kodu kopyala
npx prisma migrate dev --name init
Before starting the project, install Docker on your computer and use the following command to start the Redis container from the docker-compose.yaml file:

Kodu kopyala
docker-compose up -d redis
Once the Redis container is up, we start the project with:

arduino
Kodu kopyala
npm run dev
Create User and Login
/auth/register API
We can register a user by sending a POST request with the following body:

json
Kodu kopyala
{
    "name": "Test 2",
    "surname": "Test 2",
    "password": "123456",
    "identity_no": "123453434",
    "total_account": 3000,
    "email": "test1@mail.com",
    "amount": 1500
}
On the backend, when registering the user, the amount or percentage will determine how much of the money goes into the mod account and the mod type.

/auth/login API
Users can log in by sending a POST request with the following body:

json
Kodu kopyala
{
    "password": "123456",
    "email": "toprak1734@test.com"
}
This will return a token, and for portfolio APIs, the token is used to find the user and update their data accordingly.

Portfolio
Create Portfolio
Using the /portfolio/create API with an Authorization Bearer token, we can create a portfolio for the user. The request body looks like this:
{
    "portfolio": {
        "BTC": 22,
        "ETH": 17
    }
}
This will create a portfolio for the user in the database, and the data will also be cached in Redis.

Update Portfolio
Using the /portfolio/update API with an Authorization Bearer token, we can update a user's portfolio. The request body looks like this:
{
    "portfolio": {
        "BTC": 17,
        "DASH": 35
    }
}
This will update the user's portfolio in the database and also update the data in Redis.


Get All Portfolio
The /portfolio/getAll API allows us to fetch all user portfolios. Since this is expected to be an admin operation, 
we currently don't require a token, but in the future, authorization with an admin token can be added.
If there is data in Redis, this data comes from there as cached data, otherwise it comes from the database.

Mock Data Transaction
The /transaction API will return mock transaction data related to users.

Analytics
The /auth/analytics API allows us to view user data, such as their mod type and income.

Simulator
The simulatorMod function inside the controllers file first resets the accounts of all users based on their amount or percentage and recalculates their balances. Then, using OOP principles, it generates random users based on the User class and stores them in the database.
Every 5 hours, it calculates the user's income based on their mod type and adds it to their mod_income field, then sends an email using the SendGrid structure (this functionality is currently commented out because the key has been removed).
Afterward, the accounts of each user are balanced every month and transferred to their total account.
