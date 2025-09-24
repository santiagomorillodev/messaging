from jose import JWTError, jwt
from datetime import datetime, timedelta
from secrets import token_urlsafe
from typing import Optional, Dict, Any

SECRET_KEY = token_urlsafe(32)
ALGORITHM = 'HS256'
EXPIRE = 30

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token:str) -> Optional[Dict[str, str]]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as error:
        print(error)