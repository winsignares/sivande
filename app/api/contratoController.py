from flask import Flask, Blueprint, request, redirect, render_template, jsonify
from config.db import app, db, ma

from models.Contrato import Contrato, ContratoSchema

ruta_contrato =  Blueprint("ruta_contrato", __name__)

contratoSchema = ContratoSchema()
contratosSchema = ContratoSchema(many=True)

@ruta_contrato.route("/contratos", methods=["GET"])
def all_contrato():
    resultAll = Contrato.query.all()
    respo = contratosSchema.dump(resultAll)
    return jsonify(respo)

@ruta_contrato.route("/registrarContrato", methods=['POST'])
def registrar_contrato():
    id_cliente = request.json['id_cliente']
    tipo_contrato = request.json['tipo_contrato']
    fecha = request.json['fecha']
    fecha_vencimiento = request.json['fecha_vencimiento']
    estado = request.json['estado']
    interes = request.json['interes']
    valor_contrato = request.json['valor_contrato']
    valor_retiro = request.json['valor_retiro']

    nuevo_contrato = Contrato(id_cliente, tipo_contrato, fecha, fecha_vencimiento, estado, interes, valor_contrato, valor_retiro)
    db.session.add(nuevo_contrato)
    db.session.commit()
    return f" contrato Guardado Correctamente"



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