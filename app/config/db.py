from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marsmallow

app = Flask(__name__)

user = "root"
password = "root"
name_container = "mysql_container"
namedb = "db_app"

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{user}:{password}@{name_container}/{namedb}"