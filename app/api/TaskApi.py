from flask import Flask, Bluenprint, request, redirect, render_template, jsonify

from config.db import db, app, ma

from models.TaskModel import Task, TaskSchema

task_schema = TaskSchema()
task_schema = TaskSchema(many=True)

ruta_task = Bluenprint("ruta_task", __name__)

@ruta_task.route("/task", methods=["GET"])
def all_task():
    resultAll = Task.query.all()
    resp = task_schema(resultAll)

    return jsonify(resp)

@ruta_task.route("/savetask", methods=["POST"])
def tasksave():
    nametask = request.json["nametask"]
    newtask = Task(nametask)
    db.session.add(newtask)
    db.session.commit()
    return "datos guardados con exito"


@ruta_task.route("/deletetask/<id>", methods=["DELETE"])
def deletetask(id):
    task = task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return "dato eliminado con exito"


@ruta_task.route("/updatetask/<id>", methods=["PUT"])
def taskupdate():
    id = request.json["id"]
    task = task.query.get(id)
    task.nametask = request.json["nametask"]
    db.session.commit()
    return "dato actualizado con exito"