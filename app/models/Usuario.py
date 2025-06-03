from datetime import date
from config.db import db,  ma

class Usuario(db.Model):
    __tablename__ ='tbl_usuarios'
    
    cedula = db.Column(db.Integer, primary_key = True) 
    nombre = db.Column(db.String(255))
    apellido = db.Column(db.String(255))
    direccion = db.Column(db.String(255))
    rol = db.Column(db.String(255))
    telefono = db.Column(db.Integer)
    contraseña = db.Column(db.String(255)) 
    fecha_expedicion = db.Column(db.Date)
    
    def __init__(self, cedula, nombre, apellido, direccion, rol, telefono, fecha_expedicion):
                self.cedula = cedula
                self.nombre = nombre
                self.apellido = apellido
                self.direccion = direccion
                self.rol = rol
                self.telefono = telefono
                self.fecha_expedicion = fecha_expedicion
        
# with app.app_context():
#     db.create_all()
#      # Verificar si el usuario ya existe para evitar duplicados
#     usuario_existente = Usuario.query.filter_by(cedula=1020).first()
    
#     if not usuario_existente:
#         usuario = Usuario(
#             cedula=1020,
#             nombre="Juan",
#             apellido="Pérez",
#             direccion="Calle 123",
#             rol="admin",
#             telefono=30012,
#             fecha_expedicion=date(2010, 5, 20)
#         )
#         usuario.contraseña ="12345"
#         db.session.add(usuario)
#         db.session.commit()
#         print("✅ Usuario insertado correctamente.")
#     else:
#         print("ℹ️ El usuario ya existe.")
    
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('cedula','nombre','apellido','direccion','rol','telefono','fecha_expedicion')