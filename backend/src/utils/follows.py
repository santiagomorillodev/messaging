from sqlalchemy import and_
from sqlalchemy.orm import Session
from models import FollowerModel

def verify_follow(current_user:int, second_user:int, db: Session):
    '''
        Verifica si second_user sigue a current_user.

    Parameters:
        current_user (int): El ID del usuario que es potencialmente seguido.
        second_user (int): El ID del usuario que podría estar siguiendo.
        db (Session): Sesión activa de SQLAlchemy para consultar la base de datos.

    Returns:
        FollowerModel | None: Devuelve el objeto FollowerModel si existe la relación
        de seguimiento, o None si no existe.
    '''
    return db.query(FollowerModel).filter(
        and_(FollowerModel.follower_id == current_user,FollowerModel.followed_id == second_user)
    ).first()