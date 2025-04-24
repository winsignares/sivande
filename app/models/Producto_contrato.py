from config.db import db, app, ma

class Producto_contrato(db.Model):
    
    __tablename__ ='tbl_productos_contratos'
    
    id = db.Column(db.Integer, primary_key = True)
    id_contrato= db.Column(db.Integer, db.ForeignKey('tbl_contratos.id'))
    id_producto= db.Column(db.Integer, db.ForeignKey('tbl_productos.id'))
    cantidad = db.Column(db.Integer)
    total = db.Column(db.Float)
    
    
    def __init__(self, id_contrato, id_producto, cantidad, total):
        self.id_contrato = id_contrato
        self.id_producto = id_producto
        self.cantidad = cantidad
        self.total = total
        
with app.app_context():
    db.create_all()
    
class Producto_contratoSchema(ma.Schema):
    class Meta:
        fields = ('id','id_contrato','id_producto','cantidad','total')        