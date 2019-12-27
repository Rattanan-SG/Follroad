![posterIT59-BU07](https://user-images.githubusercontent.com/24937923/71502311-10ce7400-28a2-11ea-84eb-0dc9fa728946.png)

# เว็บแอปพลิเคชันติดตามเหตุการณ์ที่เกิดขึ้นบนท้องถนน

แอปพลิเคชันที่ช่วยให้ข้อมูลสำหรับการตัดสินใจในการเดินทางบนท้องถนน โดยแสดงข้อมูลจราจร และเหตุการณ์ในตำแหน่งที่เกิดขึ้นบนท้องถนนในประเทศไทย ซึ่งผู้ใช้จะได้รับข่าวสารเกี่ยวกับการจราจรได้อย่างรวดเร็วผ่านการแสดงบนแผนที่ และการแจ้งเตือนเมื่อมีเหตุการณ์เกิดขึ้นบนเส้นทางที่ผู้ใช้สนใจ เมื่อผู้ใช้พบเจอเหตุการณ์ที่เกิดขึ้นบนท้องถนนหรือส่งผลกับการจราจร ผู้ใช้สามารถแจ้งเหตุการณ์ที่เกิดขึ้นที่ตำแหน่งนั้นๆ ได้ด้วยตนเอง

## System Flow Diagram
![screenshot10 IT59-BU07](https://user-images.githubusercontent.com/24937923/71518749-e0f58f80-28e6-11ea-90cd-a1668563d0f1.jpeg)

## Development Tools

* Visual Studio Code version 1.41.1
* Google Chrome version 79.0.3945.88

## System Requirements

* Node.js version 12.14.0
* Yarn version 1.17.3
* Docker version 19.03.5
* Git version 2.22.0

## Credentials Keys

#### 1. Amazon Web Services Account สำหรับใช้บริการ AWS S3, AWS SQS และอื่นๆ
* IAM User with AmazonS3FullAccess and AmazonSQSFullAccess permissions
```
 - AWS_ACCESS_KEY_ID
 - AWS_SECRET_ACCESS_KEY
 - AWS_REGION
```
 - 1 AWS S3 Bucket
 - 2 AWS SQS Queue

#### 2. Google Cloud Platform Account สำหรับใช้บริการ Google Maps API
```
 - API Key (Enable Maps JavaScript API)
```

#### 3. Auth0 Account สำหรับใช้บริการเข้าสู่ระบบและการยืนยันตัวตน (Optional)
```
 - AUTH0_DOMAIN
 - AUTH0_CLIENTID
 - AUTH0_AUDIENCE
 - Facebook OAuth Key สำหรับเปิดให้บริการเข้าสู่ระบบผ่าน Facebook
 - Google OAuth Key สำหรับเปิดให้บริการเข้าสู่ระบบผ่าน Google
```

#### 4. VAPID-KEYS สำหรับการส่ง web-push notification
 สร้าง Keys ได้จากคำสั่ง
```
 npx web-push generate-vapid-keys
```
```
 - VAPID_PUBLIC_KEY
 - VAPID_PRIVATE_KEY
```
 
## Installation

### 1. Download source code or use git
```sh
git clone https://github.com/Rattanan-SG/Follroad.git
```
### 2. Setup Environment Variables
### Back-end
ที่ folder **/Follroad/back-end** จะมีอยู่ 6 folder ย่อย เข้าไปในแต่ละ folder service จะมี file ชื่อ **.env.example** อยู่ 

ซึ่งเป็นตัวอย่างของ **Environment Variables** ที่ใช้ใน service นั้น 

ให้ทำการสร้าง file ชื่อ **.env** ขึ้นมา แล้ว copy ค่าใน **.env.example** ไปใส่ และทำการแก้ไขข้อมูลให้เป็นค่าที่ต้องการ 

ทำอย่างนี้ในทุก service เช่น ที่ **DirectionRecordService** folder **/Follroad/back-end/DirectionRecordService** 

file **.env** จะมีข้อมูลดังนี้
```
 NODE_ENV=development
 NODE_PORT=3003
 MONGO_URL=mongodb://mongodb/test
 MESSAGE_QUEUE_API=http://message-queue:3001/message-queue/api
 MESSAGE_QUEUE_NAME=ScheduleCheckDirectionRecordNotification-Dev
 AUTH0_DOMAIN=sanguo.auth0.com
 AUTH0_AUDIENCE=https://follroad.tk
```
 - NODE_ENV คือ  สถานะของ environment มีค่าได้เช่น development, production
 - NODE_PORT คือ port ที่ใช้ของโปรแกรมนี้ 
 - MONGO_URL คือ url ในการเชื่อมต่อ MongoDB
 - MESSAGE_QUEUE_API คือ url api ของ MessageQueueProducerService 
 - MESSAGE_QUEUE_NAME คือ ชื่อ queue ของ AWS SQS ที่ใช้ในการส่งข้อมูลเมื่อมีเส้นทางที่ต้องส่งแจ้งเตือน
 - AUTH0_DOMAIN คือ ชื่อ Domain ของ Applications ใน Auth0
 - AUTH0_AUDIENCE คือ ค่าที่ใช้ในการตรวจสอบว่า JSON Web Token (JWT) ที่ส่งมานั้นต้องมี audience นี้อยู่

### Front-end
ทำเช่นเดียวกับ Back-end ที่ folder **/Follroad/front-end** จะมี file ชื่อ **.env.example** อยู่ 

ให้ทำการสร้าง file ชื่อ **.env.development.local** สำหรับการ **development** แล้ว copy ค่าใน **.env.example** ไปใส่ และทำการแก้ไขข้อมูลให้เป็นค่าที่ต้องการ

### 3. Setup SQL Database
**EventService** นั้นใช้ Mariadb สามารถทำการ **Initialize Database** ได้โดยการเข้าไปใน folder **/Follroad/back-end/EventService** และใช้คำสั่ง  
```
npm run db:migrate
```
แล้วตามด้วยคำสั่ง
```
npm run db:seed:all
```

## Run System

### Back-end
ถ้าสามารถใช้งาน Docker ได้ให้เข้าไปที่  folder **/Follroad** แล้วใช้คำสั่ง
```
docker-compose up
```
> เพื่อ start back-end services ทุกตัว และ Mariadb กับ Mongodb ขึ้นมา

ถ้าไม่ได้ ให้เข้าไปที่ folder back-end service แต่ละตัว และใช้คำสั่ง 
```
npm install 
```
แล้วตามด้วยคำสั่ง 
```
npm run dev
```
> ซึ่งจะเป็นการ start back-end service ที่ละตัว

### Front-end
เข้าไปที่ folder **/Follroad/front-end** และใช้คำสั่ง
```
yarn
```
แล้วตามด้วยคำสั่ง 
```
yarn serve
```

## Deployment

### Back-end
ทำได้ 2 วิธี
1. ใช้ Docker โดยการเข้าไปที่ folder back-end service แต่ละตัว และใช้คำสั่ง `docker build`

เพื่อสร้าง **Container Images** จาก **Dockerfile** ในแต่ละ service 

โดย **Container Image** ที่ได้จะมีการติดตั้งโปรแกรมพร้อมใช้งานอยู่ข้างใน 

จากนั้นก็นำไปเก็บไว้ที่ **Container Repository** เช่น **Docker Hub** ด้วยคำสั่ง `docker push`

และทำการใช้คำสั่ง `docker pull` ลงมาที่เครื่อง **Server** แล้วใช้คำสั่ง `docker run` เพื่อให้ image นั้นทำงาน

หรือจะใช้ **Container Orchestration** เช่น **AWS ECS, Kubernetes** เพื่อมาจัดการ container หลายๆตัวให้ทำงานได้อย่างมีประสิทธิภาพ

2. ติดตั้ง **Node.js** ที่เครื่อง **Server** เพื่อให้สามารถ run ตัว back-end ได้

### Front-end
เข้าไปที่ folder **/Follroad/front-end** แล้วใช้คำสั่ง 
```
yarn build 
```
จะได้ folder ใหม่ที่ชื่อ dist ซึ่งเก็บ file static web พร้อมนำไป deploy ที่ web hosting ได้เลย

ซึ่งจะสร้าง web server ขึ้นมาเอง หรือใช้บริการ cloud web hosting อื่นๆ เช่น Netlify, Firebase, Heroku เป็นต้น

## Tools & Services
![screenshot8 IT59-BU07](https://user-images.githubusercontent.com/24937923/71519674-1bf9c200-28eb-11ea-9646-c4888bfd2a64.jpeg)

## Members
- 59130500016 ชลชาติ โรจสิทธิวัชร 0819005506
- 59130500075 รัชฐนัน ศรีพรประเสริฐ 0851560425
- 59130500116 กันตพัฒณ์ นาควิโรจน์ 0893016915
