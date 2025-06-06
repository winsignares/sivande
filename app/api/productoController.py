from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from config.db import  db, ma

from models.Producto import Producto, ProductoSchema
from models.Producto_contrato import Producto_contrato

ruta_producto =  Blueprint("ruta_producto", __name__)

productoSchema = ProductoSchema()
productosSchema = ProductoSchema(many=True)

@ruta_producto.route("/productos", methods=["GET"]) 
def all_producto():
    resultAll = Producto.query.all()
    respo = productosSchema.dump(resultAll)
    return jsonify(respo)

@ruta_producto.route("/getproduct", methods=["GET"]) 
def get_producto():
    
    id = request.args.get('id')
    if not id:
        return jsonify({"message": "ID no proporcionado"}), 400
    
    producto = Producto.query.get(id)
    if not producto:
        return jsonify({"message": "Producto no encontrado"}), 404
    return jsonify(productoSchema.dump(producto))

@ruta_producto.route("/registrarProducto", methods=['POST'])
def registrar_producto():
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    peso = request.json['peso']
    kilates = request.json['kilates']
    stock = request.json.get('stock', 0)  # Default stock to 0 if not provided

    nuevo_producto = Producto(descripcion, precio, peso, kilates, stock)
    db.session.add(nuevo_producto)
    db.session.commit()
    return f" producto Guardado Correctamente"

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

@ruta_producto.route("/productos/contrato", methods=["GET"])
def get_productos_por_contrato():
    """
    Devuelve todos los objetos Producto asociados al contrato `id_contrato`.
    Se hace un JOIN entre Producto_contrato y Producto para traer los datos completos del producto.
    """
    
    id_contrato = request.args.get('id_contrato')
    
    print(f"ID del contrato recibido: {id_contrato}")
    # Hacemos join: buscamos todos los Productos cuya relación en tbl_productos_contratos
    # tenga id_contrato == id_contrato
    productos = (
        db.session
        .query(Producto)
        .join(Producto_contrato, Producto.id == Producto_contrato.id_producto)
        .filter(Producto_contrato.id_contrato == id_contrato)
        .all()
    )

    if not productos:
        return jsonify({"message": "No se encontraron productos para este contrato"}), 404

    resultado = productosSchema.dump(productos)
    return jsonify(resultado), 200