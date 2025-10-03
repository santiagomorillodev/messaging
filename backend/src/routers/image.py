from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas import UserCreate, UserRead, UserDeleteRequest, UserUpdate
from models import UserModel, ImageModel
from config import get_db, cloudinary
from security import get_current_user
from cloudinary import uploader, api


root = APIRouter(prefix='/images', tags=['Images'])

@root.post('/upload')
async def upload_image(file:UploadFile = File(...), current_user:UserModel = Depends(get_current_user) ,db:Session = Depends(get_db)):
    try:
        result = uploader.upload(file.file)
        image_url = result.get('secure_url')
        public_id = result.get('public_id')
        
        image = ImageModel(
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

@root.get('/all')
async def get_images(current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    images = db.query(ImageModel).filter(ImageModel.id_user == current_user.id).all()
    if not images:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Images not found'
        )
    
    return images

@root.delete('/delete/{public_id}')
async def delete_image(public_id: str ,current_user:UserModel = Depends(get_current_user), db:Session = Depends(get_db)):
    try:
        image = db.query(ImageModel).filter(((ImageModel.id_user == current_user.id) & (ImageModel.public_id == public_id))).first()
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