from config.db import db, app, ma

class Contrato(db.Model):
    __tablename__ ='tbl_contratos'
    
    id = db.Column(db.Integer, primary_key = True) 
    id_cliente = db.Column(db.Integer, db.ForeignKey('tbl_usuarios.cedula'))
    tipo_contrato = db.Column(db.String(255))
    fecha = db.Column(db.Date)
    fecha_vencimiento = db.Column(db.Date)
    estado = db.Column(db.String(255))
    interes = db.Column(db.Float)
    valor_contrato = db.Column(db.Float)
    valor_retiro = db.Column(db.Float)
    
    def __init__(self, id_cliente, tipo_contrato, fecha, fecha_vencimiento, estado, interes, valor_contrato, valor_retiro):
        self.id_cliente = id_cliente
        self.tipo_contrato = tipo_contrato
        self.fecha = fecha
        self.fecha_vencimiento = fecha_vencimiento
        self.estado = estado
        self.interes = interes
        self.valor_contrato = valor_contrato
        self.valor_retiro = valor_retiro
        
        
with app.app_context():
    db.create_all()

class ContratoSchema(ma.Schema):
    class Meta:
        fields = ('id','id_cliente','tipo_contrato','fecha','fecha_vencimiento','estado','interes','valor_contrato','valor_retiro')
    