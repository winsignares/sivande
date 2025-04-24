from config.db import db, app, ma

class Usuario(db.Model):
    __tablename__ ='tbl_usuarios'
    
    cedula = db.Column(db.Integer, primary_key = True) 
    nombre = db.Column(db.String(255))
    apellido = db.Column(db.String(255))
    direccion = db.Column(db.String(255))
    rol = db.Column(db.String(255))
    telefono = db.Column(db.Integer)
    fecha_expedicion = db.Column(db.Date)
    
    def __init__(self, cedula, nombre, apellido, direccion, rol, telefono, fecha_expedicion):
                self.cedula = cedula
                self.nombre = nombre
                self.apellido = apellido
                self.direccion = direccion
                self.rol = rol
                self.telefono = telefono
                self.fecha_expedicion = fecha_expedicion
        
with app.app_context():
    db.create_all()
    
class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('cedula','nombre','apellido','direccion','rol','telefono','fecha_expedicion')