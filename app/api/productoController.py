from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from config.db import app, db, ma

from models.Producto import Producto, ProductoSchema

ruta_producto =  Blueprint("ruta_producto", __name__)

productoSchema = ProductoSchema()
productosSchema = ProductoSchema(many=True)

@ruta_producto.route("/productos", methods=["GET"]) 
def all_producto():
    resultAll = Producto.query.all()
    respo = productosSchema.dump(resultAll)
    return jsonify(respo)

@ruta_producto.route("/registrarProducto", methods=['POST'])
def registrar_producto():
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    peso = request.json['peso']
    kilates = request.json['kilates']

    nuevo_producto = Producto(descripcion, precio, peso, kilates)
    db.session.add(nuevo_producto)
    db.session.commit()
    return f" producto {descripcion} Guardado Correctamente"

@ruta_producto.route("/actualizarProducto", methods=['PUT'])
def actualizar_producto():
    id = request.json['id']
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    peso = request.json['peso']
    kilates = request.json['kilates']

    producto = Producto.query.get(id)
    producto.descripcion = descripcion
    producto.precio = precio
    producto.peso = peso
    producto.kilates = kilates

    db.session.commit()
    return jsonify(productoSchema.dump(producto))


@ruta_producto.route("/eliminarProducto", methods=['DELETE'])
def eliminar_producto():
    id = request.json['id']
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return f"Producto {producto.descripcion} eliminado correctamente"