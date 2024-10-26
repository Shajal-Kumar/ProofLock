from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from config import SECRET_KEY
import os

load_dotenv()

app = Flask(__name__)

# Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///prooflock.db"
app.config["SECRET_KEY"] = SECRET_KEY
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key")

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Register blueprints
from routes import auth as auth_blueprint

app.register_blueprint(auth_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
