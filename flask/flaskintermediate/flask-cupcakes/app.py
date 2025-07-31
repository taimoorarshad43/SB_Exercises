"""Flask app for Cupcakes"""

from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from models import db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    """Show homepage with cupcake list and form."""
    return render_template('index.html')

@app.route('/api/cupcakes')
def list_cupcakes():
    """Get data about all cupcakes."""
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Get data about a single cupcake."""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Create a cupcake with flavor, size, rating and image data from the body of the request."""
    data = request.json
    
    cupcake = Cupcake(
        flavor=data['flavor'],
        size=data['size'],
        rating=data['rating'],
        image=data.get('image', 'https://tinyurl.com/demo-cupcake')
    )
    
    db.session.add(cupcake)
    db.session.commit()
    
    return jsonify(cupcake=cupcake.serialize()), 201

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    """Update a cupcake with the id passed in the URL and flavor, size, rating and image data from the body of the request."""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    data = request.json
    
    cupcake.flavor = data['flavor']
    cupcake.size = data['size']
    cupcake.rating = data['rating']
    cupcake.image = data['image']
    
    db.session.commit()
    
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """Delete cupcake with the id passed in the URL."""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    db.session.delete(cupcake)
    db.session.commit()
    
    return jsonify(message="Deleted")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
