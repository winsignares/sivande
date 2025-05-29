from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from config.db import app, db, ma

from models.Producto_contrato import Producto_contrato, Producto_contratoSchema
ruta_producto_contrato = Blueprint("ruta_producto_contrato", __name__)
producto_contratoSchema = Producto_contratoSchema()
productos_contratoSchema = Producto_contratoSchema(many=True)

@ruta_producto_contrato.route("/productos_contrato", methods=["GET"])
def all_producto_contrato():
    resultAll = Producto_contrato.query.all()
    respo = productos_contratoSchema.dump(resultAll)
    return jsonify(respo)

@ruta_producto_contrato.route("/registrarProducto_contrato", methods=['POST'])
def registrar_producto_contrato():
    id_producto = request.json['id_producto']
    id_contrato = request.json['id_contrato']
    cantidad = request.json['cantidad']
    total = request.json['total']

    nuevo_producto_contrato = Producto_contrato(id_contrato,id_producto, cantidad,total)
    db.session.add(nuevo_producto_contrato)
    db.session.commit()
    return f" producto contrato {id_producto} {id_contrato} Guardado Correctamente"

@ruta_producto_contrato.route("/actualizarProducto_contrato", methods=['PUT'])
def actualizar_producto_contrato():
    id_producto = request.json['id_producto']
    id_contrato = request.json['id_contrato']
    cantidad = request.json['cantidad']
    precio = request.json['precio']

    producto_contrato = Producto_contrato.query.get(id_producto)
    producto_contrato.id_contrato = id_contrato
    producto_contrato.cantidad = cantidad
    producto_contrato.precio = precio

    db.session.commit()
    return jsonify(producto_contratoSchema.dump(producto_contrato))

@ruta_producto_contrato.route("/eliminarProducto_contrato", methods=['DELETE'])
def eliminar_producto_contrato():
    id_producto = request.json['id_producto']
    producto_contrato = Producto_contrato.query.get(id_producto)
    db.session.delete(producto_contrato)
    db.session.commit()
    return f"producto contrato {id_producto} eliminado correctamente"