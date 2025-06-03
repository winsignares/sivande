from flask import Flask, request, redirect, render_template
from config.db import app,db

from models.Usuario import Usuario

# trabajar en las rutas de bluprint con respectos a las api's
from api.usuarioController import ruta_usuario
from api.contratoController import ruta_contrato
from api.productoController import ruta_producto
from api.Producto_contratoController import ruta_producto_contrato


# Importar los Blueprints
app.register_blueprint(ruta_usuario, url_prefix="/api")
app.register_blueprint(ruta_contrato, url_prefix="/api")
app.register_blueprint(ruta_producto, url_prefix="/api")
app.register_blueprint(ruta_producto_contrato, url_prefix="/api")


#rutas
from routes.admin_routes import admin_routes

app.register_blueprint(admin_routes)


# config el servidor
@app.route("/")
def index():
    return render_template("InicioSesion.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")

        
with app.app_context():
    db.create_all()
     # Verificar si el usuario ya existe para evitar duplicados
    usuario_existente = Usuario.query.filter_by(cedula=1020).first()
    
    if not usuario_existente:
        usuario = Usuario(
            cedula=1020,
            nombre="Juan",
            apellido="Pérez",
            direccion="Calle 123",
            rol="admin",
            telefono=30012,
            fecha_expedicion=date(2010, 5, 20)
        )
        usuario.contraseña ="12345"
        db.session.add(usuario)
        db.session.commit()
        print("✅ Usuario insertado correctamente.")
    else:
        print("ℹ️ El usuario ya existe.")