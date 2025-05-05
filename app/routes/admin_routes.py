from flask import Blueprint, render_template



user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/login', methods=['GET'])
def login():
    return render_template('InicioSesion.html')



@user_routes.route('/clientes', methods=['GET'])
def clientes():
    return render_template('clientes.html')


@user_routes.route('/contratos', methods=['GET'])
def contratos():
    return render_template('contratos.html')


@user_routes.route('/menu', methods=['GET'])
def menu():
    return render_template('menu.html')


@user_routes.route('/ventas', methods=['GET'])
def ventas():
    return render_template('Ventas.html')


