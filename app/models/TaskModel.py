from config.db import app, db, ma

class Task(db.Model):
    __tablename__="tbl_category"

    id = db.Column(db.Integer, primary_key = True)
    nametask = db.Column(db.String(100))
    id_user_fk = db.column(db.Integer, db.foreignKey("tblusers.id"))
    id_category_fk = db.column(db.Integer, db.foreignKey("tblcategory.id"))

    def __init__(self, nametask, id_user_fk,id_category_fk ):
        self.nametask = nametask
        self.id_category_fk = id_category_fk
        self.id_user_fk = id_user_fk


with app.app_context():
    db.create_all()  



class TaskSchema(ma.Schema):
    class Meta:
        fields = ("id", "nametask", "id_user_fk","id_category_fk")