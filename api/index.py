from fastapi import FastAPI
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
from datetime import datetime, timedelta, timezone
import jwt
import bcrypt
import certifi
import os

load_dotenv()
MONGO_URI =os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")


client = MongoClient(MONGO_URI,tlsCAFile=certifi.where())
db = client["mywebsite"]
userCollections = db["users"]

app = FastAPI()
security = HTTPBearer()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Register feild
class User(BaseModel):
    username: str
    email: str
    password: str
    role : str

#login feild
class loginUser(BaseModel):
    email: str
    password : str

#Refresh token function
def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired"
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    

#fast api home
@app.get("/api")
def home():
    return {"message": "Hello World"}

##Register
@app.post("/api/register")
def register(user: User):

    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'),
        bcrypt.gensalt()
    )

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password.decode('utf-8'),
        "role":user.role
    }

    userCollections.insert_one(user_data)

    return {
        "message": "User registerd successfully",
    }


#Login
@app.post("/api/login")
def login(user: loginUser):
    storedUser = userCollections.find_one({"email":user.email})
    if storedUser is None:
        return{"message":"Invalid email or password"}
    
    password_correct = bcrypt.checkpw(
        user.password.encode("utf-8"),
        storedUser["password"].encode("utf-8")
    )

    if not password_correct:
        return{"message":"Invalid email or password"}
    
    token = jwt.encode(
        {
            "user_id": str(storedUser["_id"]),
            "exp": datetime.now(timezone.utc) + timedelta(hours=1)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "message": "Login successful",
        "access_token": token
    }

#authentication
@app.get("/api/profile")
def profile(payload: dict = Depends(verify_token)):

    user_id = ObjectId(payload["user_id"])

    user = userCollections.find_one({
        "_id": user_id
    })

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "You are authenticated!",
        "username": user["username"],
        "email": user["email"]
    }

# MongoDB check
@app.get("/api/test-db")
def test_db():
    client.admin.command('ping')
    return {"message":"Mongodb Connected!"}