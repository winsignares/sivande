from config.db import db, app, ma


class Producto(db.Model):
    
    __tablename__ ='tbl_productos'
    id = db.Column(db.Integer, primary_key = True)
    descripcion = db.Column(db.String(255))
    precio = db.Column(db.Float)
    peso = db.Column(db.Float)
    kilates = db.Column(db.String(255))
    
    def __init__(self, descripcion, precio, peso, kilates):
        self.descripcion = descripcion
        self.precio = precio
        self.peso = peso
        self.kilates = kilates

with app.app_context():
    db.create_all()

class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('id','descripcion','precio','peso','kilates')