from flask import Flask, request, redirect, render_template
from config.db import app

# trabajar en las rutas de bluprint con respectos a las api's
from api.usuarioController import ruta_usuario
from api.contratoController import ruta_contrato
from api.productoController import ruta_producto
from api.Producto_contratoController import ruta_producto_contrato
from api.UserApi import ruta_user
from api.CategoryApi import ruta_category
from api.TaksApi import ruta_tak

# Importar los Blueprints
app.register_blueprint(ruta_usuario, url_prefix="/api")
app.register_blueprint(ruta_contrato, url_prefix="/api")
app.register_blueprint(ruta_producto, url_prefix="/api")
app.register_blueprint(ruta_producto_contrato, url_prefix="/api")
app.register_blueprint(ruta_user, url_prefix="/api")
app.register_blueprint(ruta_category, url_prefix="/api")
app.register_blueprint(ruta_tak, url_prefix="/api")

# config el servidor


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
