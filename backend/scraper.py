# scraper.py
import requests
from bs4 import BeautifulSoup
from models import Book


def scrape_books(app, db):
    base_url = "http://books.toscrape.com/"
    books = []
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    categories = soup.find('div', class_='side_categories').find_all('a')[1:]

    for category in categories:
        category_name = category.text.strip()
        category_url = base_url + category['href']
        next_page = category_url

        while next_page:
            response = requests.get(next_page)
            soup = BeautifulSoup(response.content, 'html.parser')
            book_list = soup.find_all('article', class_='product_pod')

            for book in book_list:
                title = book.h3.a['title']
                price = float(book.find('p', class_='price_color').text[1:])
                rating = book.p['class'][1].lower()
                rating_map = {'one': 1, 'two': 2,
                              'three': 3, 'four': 4, 'five': 5}
                availability = 'In stock' in book.find(
                    'p', class_='instock').text
                books.append({
                    'title': title,
                    'price': price,
                    'category': category_name,
                    'rating': rating_map.get(rating, 0),
                    'availability': availability
                })

            next_page = soup.find('li', class_='next')
            next_page = base_url + next_page.a['href'] if next_page else None

    # Save to database
    with app.app_context():
        db.session.bulk_insert_mappings(Book, books)
        db.session.commit()
