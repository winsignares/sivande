from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from app.models import Producto_contrato
from config.db import app, db, ma
from models.Producto import Producto 
from models.Contrato import Contrato, ContratoSchema

ruta_contrato =  Blueprint("ruta_contrato", __name__)

contratoSchema = ContratoSchema()
contratosSchema = ContratoSchema(many=True)

@ruta_contrato.route("/contratos", methods=["GET"])
def all_contrato():
    resultAll = Contrato.query.all()
    respo = contratosSchema.dump(resultAll)
    return jsonify(respo)

# @ruta_contrato.route("/registrarContrato", methods=['POST'])
# def registrar_contrato():
#     id_cliente = request.json['id_cliente']
#     tipo_contrato = request.json['tipo_contrato']
#     fecha = request.json['fecha']
#     fecha_vencimiento = request.json['fecha_vencimiento']
#     estado = request.json['estado']
#     interes = request.json['interes']
#     valor_contrato = request.json['valor_contrato']
#     valor_retiro = request.json['valor_retiro']

#     nuevo_contrato = Contrato(id_cliente, tipo_contrato, fecha, fecha_vencimiento, estado, interes, valor_contrato, valor_retiro)
#     db.session.add(nuevo_contrato)
#     db.session.commit()
#     return f" contrato Guardado Correctamente"

@ruta_contrato.route("/registrarContrato", methods=['POST'])
def registrar_contrato():
    data = request.get_json()

    # Datos del contrato
    id_cliente = data['id_cliente']
    tipo_contrato = data['tipo_contrato']
    fecha = data['fecha']
    fecha_vencimiento = data['fecha_vencimiento']
    estado = data['estado']
    interes = data['interes']
    valor_contrato = data['valor_contrato']
    valor_retiro = data['valor_retiro']

    # Crear contrato
    nuevo_contrato = Contrato(id_cliente, tipo_contrato, fecha, fecha_vencimiento, estado, interes, valor_contrato, valor_retiro)
    db.session.add(nuevo_contrato)
    db.session.commit()  # Guardamos para obtener el ID

    # Guardar productos asociados (calculando total automáticamente)
    productos = data.get('productos', [])
    for item in productos:
        id_producto = item['id_producto']
        cantidad = item['cantidad']

        producto = Producto.query.get(id_producto)
        if not producto:
            return jsonify({"error": f"Producto con ID {id_producto} no encontrado"}), 404

        total = cantidad * producto.precio

        producto_contrato = Producto_contrato(nuevo_contrato.id, id_producto, cantidad, total)
        db.session.add(producto_contrato)

    db.session.commit()

    return jsonify({"mensaje": "Contrato y productos asociados guardados correctamente", "id_contrato": nuevo_contrato.id})



@ruta_contrato.route("/actualizarContrato", methods=['PUT'])
def actualizar():
    id_contrato = request.json['id']
    fecha_vencimiento = request.json['fecha_vencimiento']
    fecha = request.json['fecha']


    contrato = Contrato.query.get(id_contrato)
    contrato.fecha = fecha
    contrato.fecha_vencimiento = fecha_vencimiento


    db.session.commit()
    return jsonify(contratoSchema.dump(contrato))


@ruta_contrato.route("/eliminarContrato", methods=['DELETE'])
def eliminar_contrato():
    id = request.json['id'] 
    estado = request.json['estado']
    contrato = Contrato.query.get(id)   
    contrato.estado = estado

    db.session.commit()     
    return jsonify(contratoSchema.dump(contrato))