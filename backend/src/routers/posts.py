from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException,status
from sqlalchemy import desc
from sqlalchemy.orm import Session
from models import PostModel, UserModel, FollowerModel
from config import get_db
from security import get_current_user
from cloudinary import uploader, api

root = APIRouter(prefix='/post', tags=['Post'])

@root.post('/create')
async def create_post(
    content: str = Form(...),
    file: UploadFile = File(None),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        image_url = None
        public_id = None

        if file:
            result = uploader.upload(file.file)
            image_url = result.get('secure_url')
            public_id = result.get('public_id')

        post = PostModel(
            id_user=current_user.id,
            content=content,
            url=image_url,
            public_id=public_id
        )
        db.add(post)
        db.commit()
        db.refresh(post)

        return {
            "id": post.id,
            "content": post.content,
            "url": post.url,
            "public_id": post.public_id,
            "created": post.created
        }

    except Exception as e:
        print("⚠️ Error subiendo post:", e)
        raise HTTPException(status_code=500, detail="Error creating post")

@root.get('/{id}')
def get_posts_current_user(id: int, db: Session = Depends(get_db)):
    try:
        posts = db.query(PostModel)\
                  .filter(PostModel.id_user == id)\
                  .order_by(PostModel.id.desc())\
                  .all()  # <--- importante

        if not posts:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Posts not found'
            )

        return posts

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )



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