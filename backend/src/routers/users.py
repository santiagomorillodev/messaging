from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas import UserCreate, UserRead, UserDeleteRequest, UserUpdate
from models import UserModel, FollowerModel
from utils import get_user_email, get_by_username, verify_follow
from config import get_db
from security import hash_password, verify_password, create_access_token, get_current_user


root = APIRouter(tags=['Users'])

@root.post('/register')
def register(user:UserCreate, db: Session = Depends(get_db)):
    try:
        email = get_user_email(db, user.email)
        user_username = get_by_username
        if email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={'message', 'The email is already in use'}
            )
        
        if user_username:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={'message', 'The username is already in use'}
            )
            
        new_user = UserModel(
            name = user.name,
            age = user.age,
            email = user.email,
            username = user.username,
            password = hash_password(user.password)
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {'message': 'User Created'}
    except ValueError as e:
        print(e)

@root.post('/login')
def login(data:OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    
    try:
        user_db = db.query(UserModel).filter(UserModel.username == data.username).first()
        
        if not user_db or not verify_password(data.password, user_db.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='invalid credentials'
            )
            
        token = create_access_token({'sub': user_db.username, 'id': user_db.id})
        return {'access_token': token, 'token_type': 'bearer'}
    
    except ValueError as error:
        print(error)

@root.get('/', response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()
    return users

@root.get('/username')
def get_user_by_username(username:str, db:Session = Depends(get_db)):
    try:
        user = get_by_username(db, username)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message', 'User not found'}
            )
        
        return user
    except ValueError as error:
        print(error)
      

@root.get('/me', response_model=UserRead)
def current_user(user:UserModel = Depends(get_current_user)):
    return user


@root.delete('/')
def delete_current_user(data: UserDeleteRequest, user: UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    password = str(data.password)
    hashed_password = str(user.password)
    print(password, '\n', hashed_password)
    try:
        
        correct_password = verify_password(password, hashed_password)
        
        if not correct_password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid credentials in endpoint'
            )
        
        db.delete(user)
        db.commit()
        return '200 ok'
    except ValueError as error:
        print(error, ' value error')
    except HTTPException as e:
        print(e.detail, 'HTTPException')
        
        
@root.patch('/')
def update_user(data: UserUpdate, current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalida credentials'
        )
    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return 'Updated user'

@root.get('/followers')
def get_follower(user:UserModel = Depends(get_current_user)):
    try:
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message': "He has no followers"}
            )
        return user.followers
    except ValueError as error:
        print(error)
        
@root.get('/following')
def get_followed(user:UserModel = Depends(get_current_user)):
    try:
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message': "You don't follow anyone"}
            )
        return user.following
    except ValueError as error:
        print(error)

@root.post('/follower')
def follow(followed: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    
    try:
        follow_user = verify_follow(current_user, followed, db)
        if follow_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={'message': 'You already follow this user'}
            )
        
        new_follow = FollowerModel(
            follower_id = current_user,
            followed_id = followed
        )
        
        db.add(new_follow)
        db.commit()
        return {'message': '200 ok'}
    except ValueError as error:
        print(error)

@root.delete('/follower')
def unfollow(followed: int, current_user: UserModel = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        following = verify_follow(current_user, followed, db)
        if not following:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message': "You don't follow this account"}
            )
            
        print(following)
        
        db.delete(following)
        db.commit()
        return {'message': '200 ok'}
    except ValueError as error:
        print(error)


# Santiago1$