from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

user = "root"
password = "root"
name_container = "mysql_container"
namedb = "db_app"

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{user}:{password}@{name_container}/{namedb}"
app.config['SQLALCHEMY_TRACK:NOTIFICATIONS'] =  False
app.secret_key = "ingweb"


db = SQLAlchemy(app)
ma = Marsmallow(app)