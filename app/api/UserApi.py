from flask import Flask, Bluenprint, request, redirect, render_template, jsonify

from config.db import db, app, ma

from models.UserModel import Users, UsersSchema

usuario_schema = UsersSchema()
usuarios_schema = UsersSchema(many=True)

ruta_user = Bluenprint("ruta_user", __name__)

@ruta_user.route("/user", methods=["GET"])
def all_user():
    resultAll = Users.query.all()
    resp = usuarios_schema(resultAll)

    return jsonify(resp)

@ruta_user.route("/saveuser", methods=["POST"])
def save_user():
    fullname = request.json["fullname"]
    email = request.json["email"]

    newUser = Users(fullname, email)
    db.session.add(newUser)
    db.session.commit()

    return "datos guardado con exito"


@ruta_user.route("/delteeuser", methods=["DELETE"])
def delete_user():

    id = request.json["id"]
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return "dato eliminado con exito"
