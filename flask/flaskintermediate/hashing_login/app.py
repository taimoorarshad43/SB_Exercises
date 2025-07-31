from flask import Flask, render_template, redirect, url_for, request, flash, session
from models import db, User, Feedback
from forms import RegistrationForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev'

db.init_app(app)

@app.route('/')
def home():
    return redirect(url_for('register'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        session['username'] = user.username
        return redirect(url_for('user_detail', username=user.username))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            session['username'] = user.username
            return redirect(url_for('user_detail', username=user.username))
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html', form=form)

@app.route('/users/<username>')
def user_detail(username):
    if 'username' not in session or session['username'] != username:
        flash('You are not authorized to view this page.', 'danger')
        return redirect(url_for('login'))
    user = User.query.filter_by(username=username).first_or_404()
    feedbacks = Feedback.query.filter_by(username=username).all()
    return render_template('userdetail.html', user=user, feedbacks=feedbacks)

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' not in session or session['username'] != username:
        flash('You are not authorized to delete this user.', 'danger')
        return redirect(url_for('login'))
    user = User.query.filter_by(username=username).first_or_404()
    Feedback.query.filter_by(username=username).delete()
    db.session.delete(user)
    db.session.commit()
    session.clear()
    return redirect(url_for('home'))

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    if 'username' not in session or session['username'] != username:
        flash('You are not authorized to add feedback for this user.', 'danger')
        return redirect(url_for('login'))
    form = FeedbackForm()
    if form.validate_on_submit():
        feedback = Feedback(title=form.title.data, content=form.content.data, username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(url_for('user_detail', username=username))
    return render_template('feedback_form.html', form=form, action='Add')

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or session['username'] != feedback.username:
        flash('You are not authorized to edit this feedback.', 'danger')
        return redirect(url_for('login'))
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(url_for('user_detail', username=feedback.username))
    return render_template('feedback_form.html', form=form, action='Edit')

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or session['username'] != feedback.username:
        flash('You are not authorized to delete this feedback.', 'danger')
        return redirect(url_for('login'))
    username = feedback.username
    db.session.delete(feedback)
    db.session.commit()
    return redirect(url_for('user_detail', username=username))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True) 