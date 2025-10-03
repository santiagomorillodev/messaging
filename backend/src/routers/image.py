from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas import UserCreate, UserRead, UserDeleteRequest, UserUpdate
from models import UserModel, ImageModel
from config import get_db, cloudinary
from security import get_current_user
import cloudinary.uploader

root = APIRouter(prefix='/images', tags=['Images'])

@root.post('/upload')
async def upload_image(file:UploadFile = File(...), current_user:UserModel = Depends(get_current_user) ,db:Session = Depends(get_db)):
    try:
        result = cloudinary.uploader.upload(file.file)
        image_url = result.get('secure_url')
        
        image = ImageModel(
            id_user = current_user.id,
            url = image_url
        )
        db.add(image)
        db.commit()
        db.refresh(image)
        return {'id': image.id, 'url': image.url}
    except ValueError as error:
        print(error)