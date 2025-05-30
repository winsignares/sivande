from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from config.db import app, db, ma

from models.Usuario import Usuario, UsuarioSchema

ruta_usuario =  Blueprint("ruta_usuario", __name__)


usuarioSchema = UsuarioSchema()
usuariosSchema = UsuarioSchema(many=True)


@ruta_usuario.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    cedula = data.get('cedula')
    contrasena = data.get('contraseña')

    if not cedula or not contrasena:
        return jsonify({"mensaje": "Faltan datos"}), 400

    usuario = Usuario.query.filter_by(cedula=cedula).first()

    if usuario and usuario.contraseña == contrasena:
        return jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "usuario": {
                "cedula": usuario.cedula,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "rol": usuario.rol
            }
        }), 200
    else:
        return jsonify({"mensaje": "Credenciales incorrectas"}), 401


@ruta_usuario.route("/usuarios", methods=["GET"])
def all_usuario():
    resultAll = Usuario.query.all()
    respo = usuariosSchema.dump(resultAll)
    return jsonify(respo)


@ruta_usuario.route("/registrarUsuario", methods=['POST'])
def registrar_usuario():
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    direccion = request.json['direccion']
    rol = request.json['rol']
    telefono = request.json['telefono']
    fecha_expedicion = request.json['fecha_expedicion']

    nuevo_usuario = Usuario(cedula, nombre, apellido, direccion, rol, telefono, fecha_expedicion)
    db.session.add(nuevo_usuario)
    db.session.commit()
    return f" usuario {nombre} {apellido} Guardado Correctamente"


@ruta_usuario.route("/actualizarUsuario", methods=['PUT'])
def actualizar_usuario():
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    direccion = request.json['direccion']
    rol = request.json['rol']
    telefono = request.json['telefono']
    fecha_expedicion = request.json['fecha_expedicion']

    usuario = Usuario.query.get(cedula)
    usuario.nombre = nombre
    usuario.apellido = apellido
    usuario.direccion = direccion
    usuario.rol = rol
    usuario.telefono = telefono
    usuario.fecha_expedicion = fecha_expedicion

    db.session.commit()
    return jsonify(usuarioSchema.dump(usuario))



@ruta_usuario.route("/eliminarUsuario", methods=['DELETE'])
def eliminar_usuario():
    cedula = request.json['cedula'] 
    usuario = Usuario.query.get(cedula)    
    db.session.delete(usuario)
    db.session.commit()     
    return jsonify(usuarioSchema.dump(usuario))