import base64
import tempfile
from cloudinary import uploader

async def upload_base64_to_cloudinary(image_base64: str):
    """
    Recibe una imagen base64 (data:image/xxx;base64,xxxx)
    La convierte en archivo temporal y la sube a Cloudinary.
    """
    
    # Quitar encabezado "data:image/jpeg;base64,"
    if "," in image_base64:
        image_base64 = image_base64.split(",")[1]

    # Decodificar base64
    img_bytes = base64.b64decode(image_base64)

    # Guardar en un archivo temporal
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_img:
        temp_img.write(img_bytes)
        temp_img_path = temp_img.name

    # Subir a Cloudinary
    result = uploader.upload(temp_img_path)

    return {
        "secure_url": result.get("secure_url"),
        "public_id": result.get("public_id")
    }
