"""Flask app for adopt app."""

from flask import Flask, render_template, redirect, url_for, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SECRET_KEY'] = "dev"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///adopt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

# Create tables and add sample data
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    """Home page - list all pets."""
    pets = Pet.query.all()
    return render_template("home.html", pets=pets)


@app.route("/add", methods=["GET", "POST"])
def show_add_form():
    """Show form for adding a pet and handle form submission."""
    form = AddPetForm()
    
    if form.validate_on_submit():
        # Create new pet from form data
        new_pet = Pet(
            name=form.name.data,
            species=form.species.data,
            photo_url=form.photo_url.data,
            age=form.age.data,
            notes=form.notes.data
        )
        
        db.session.add(new_pet)
        db.session.commit()
        
        flash(f"{new_pet.name} added successfully!")
        return redirect(url_for('home'))
    
    return render_template("add_pet.html", form=form)


@app.route("/<int:pet_id>", methods=["GET", "POST"])
def show_pet(pet_id):
    """Show pet details and handle edit form submission."""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    
    if form.validate_on_submit():
        # Update pet with form data
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        
        db.session.commit()
        
        flash(f"{pet.name} updated successfully!")
        return redirect(url_for('home'))
    
    return render_template("pet_detail.html", pet=pet, form=form)


if __name__ == '__main__':
    app.run(debug=True) 