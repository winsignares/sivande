from flask import Blueprint, render_template



admin_routes = Blueprint('user_routes', __name__)

@admin_routes.route('/login', methods=['GET'])
def login():
    return render_template('InicioSesion.html')



@admin_routes.route('/clientes', methods=['GET'])
def clientes():
    return render_template('clientes.html')


@admin_routes.route('/contratos', methods=['GET'])
def contratos():
    return render_template('contratos.html')


@admin_routes.route('/menu', methods=['GET'])
def menu():
    return render_template('menu.html')


@admin_routes.route('/ventas', methods=['GET'])
def ventas():
    return render_template('Ventas.html')


#RUTAS FALTANTES
@admin_routes.route('/contratos_vigentes', methods=['GET'])
def contratos_vigentes():
    return render_template('contratos_vigentes.html')


@admin_routes.route('/liquidar_contrato', methods=['GET'])
def liquidar_contrato():
    return render_template('liquidar_contrato.html')

@admin_routes.route('/crear_producto', methods=['GET'])
def crear_producto():
    return render_template('crear_producto.html')



