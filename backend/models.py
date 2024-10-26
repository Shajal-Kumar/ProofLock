from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from app import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # Roles: Forensic Analyst, Police, Jury, Admin

    def __init__(self, username, password, role):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")
        self.role = role

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
