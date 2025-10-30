from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas import UserCreate, UserRead, UserDeleteRequest, UserUpdate
from models import UserModel, PostModel
from config import get_db, cloudinary
from security import get_current_user
from cloudinary import uploader, api


root = APIRouter(prefix='/post', tags=['Post'])

@root.post('/upload')
async def upload_image(file:UploadFile = File(...), current_user:UserModel = Depends(get_current_user) ,db:Session = Depends(get_db)):
    try:
        result = uploader.upload(file.file)
        image_url = result.get('secure_url')
        public_id = result.get('public_id')
        
        image = PostModel(
            id_user = current_user.id,
            public_id = public_id,
            url = image_url
            
        )
        db.add(image)
        db.commit()
        db.refresh(image)
        return {'id': image.id, 'url': image.url}
    except ValueError as error:
        print(error)

@root.get('/{id}')
async def get_posts_current_user(id:int, db:Session = Depends(get_db)):
    try:
        posts = db.query(PostModel).filter(PostModel.id_user == id).all()
        if not posts:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='posts not found'
            )
        
        return posts
    
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@root.delete('/delete/{public_id}')
async def delete_image(public_id: str ,current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        image = db.query(PostModel).filter(((PostModel.id_user == current_user.id) & (PostModel.public_id == public_id))).first()
        if not image:
            raise HTTPException(status_code=404, detail="Image not found or already deleted")
        
        image_cloudinary = api.resource(public_id)
        
        if not image_cloudinary:
            raise HTTPException(status_code=404, detail="Image not found or already deleted")
        
        result = uploader.destroy(public_id)
        
        if result.get("result") != "ok":
            raise HTTPException(status_code=404, detail="Image not found or already deleted")
        
        db.delete(image)
        db.commit()
        
        return {"message": "Image deleted successfully", "public_id": public_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))