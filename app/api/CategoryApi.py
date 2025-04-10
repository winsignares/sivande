from flask import Flask, Bluenprint, request, redirect, render_template, jsonify

from config.db import db, app, ma

from models.Category import Category, categorySchema

category_schema = categorySchema()
category_schema = category_schema(many=True)

ruta_category = Bluenprint("ruta_category", __name__)

@ruta_category.route("/category", methods=["GET"])
def all_category():
    resultAll = Category.query.all()
    resp = category_schema(resultAll)

    return jsonify(resp)

@ruta_category.route("/savecategory", methods=["POST"])
def categorysave():
    namecategory = request.json["namecategory"]
    newcategory = Category(namecategory)
    db.session.add(newcategory)
    db.session.commit()
    return "datos guardados con exito"


@ruta_category.route("/deletecategory/<id>", methods=["DELETE"])
def deletecategory(id):
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return "dato eliminado con exito"


@ruta_category.route("/updatecategory/<id>", methods=["PUT"])
def categoryupdate():
    id = request.json["id"]
    category = Category.query.get(id)
    category.namecategory = request.json["namecategory"]
    db.session.commit()
    return "dato actualizado con exito"