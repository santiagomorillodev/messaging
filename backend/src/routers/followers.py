from fastapi import APIRouter, Depends, HTTPException, status
from models import FollowerModel
from sqlalchemy.orm import Session
from sqlalchemy import and_
from config import get_db
from utils import verify_follow

router = APIRouter(prefix='/followers', tags=['Followers'])



@router.get('/')
def get_followers(user_id: int, db:Session = Depends(get_db)):
    try:
        followers = db.query(FollowerModel).filter(FollowerModel.follower_id == user_id).all()
        if not followers:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message': 'No tiene seguidores'}
            )
        return followers
    except ValueError as error:
        print(error)

@router.post('/')
def follow(current_user: int, followed: int, db: Session = Depends(get_db)):
    
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

@router.delete('/')
def unfollow(current_user: int, followed: int, db: Session = Depends(get_db)):
    try:
        following = verify_follow(current_user, followed, db)
        if not following:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={'message': 'No sigues a esta cuenta'}
            )
            
        print(following)
        
        db.delete(following)
        db.commit()
        return {'message': '200 ok'}
    except ValueError as error:
        print(error)