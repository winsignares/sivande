from flask import Flask, request,redirect, render_template
from config.db import app

#en esta parte trabajaremos la importacion de rutas 

#

@app.router("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug==True, port=5000,host="0.0.0.0")  