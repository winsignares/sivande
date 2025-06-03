from config.db import db, ma


class Producto(db.Model):
    
    __tablename__ ='tbl_productos'
    id = db.Column(db.Integer, primary_key = True)
    descripcion = db.Column(db.String(255))
    precio = db.Column(db.Float)
    peso = db.Column(db.Float)
    kilates = db.Column(db.String(255))
    stock = db.Column(db.Integer, default=0)
    
    def __init__(self, descripcion, precio, peso, kilates, stock):
        self.descripcion = descripcion
        self.precio = precio
        self.peso = peso
        self.kilates = kilates
        self.stock = stock

# with app.app_context():
#     db.create_all()

class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('id','descripcion','precio','peso','kilates')