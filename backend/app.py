# app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from models import db, Book
from scraper import scrape_books
import atexit

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

with app.app_context():
    db.create_all()

# Schedule scraping every hour
scheduler = BackgroundScheduler()
scheduler.add_job(func=lambda: scrape_books(
    app, db), trigger="interval", hours=1)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())


@app.route('/scrape', methods=['POST'])
def trigger_scrape():
    scrape_books(app, db)
    return jsonify({"status": "Scrape initiated"}), 200


@app.route('/api/books', methods=['GET'])
def get_books():
    query = Book.query
    if 'category' in request.args:
        query = query.filter_by(category=request.args['category'])
    books = query.all()
    return jsonify([{
        "title": b.title,
        "price": b.price,
        "category": b.category,
        "rating": b.rating,
        "availability": b.availability
    } for b in books])


if __name__ == '__main__':
    app.run(debug=True)
