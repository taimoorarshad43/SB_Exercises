from unittest import TestCase

from app import app
from models import db, Cupcake

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

with app.app_context():
    db.drop_all()
    db.create_all()


CUPCAKE_DATA = {
    "flavor": "TestFlavor",
    "size": "TestSize",
    "rating": 5,
    "image": "http://test.com/cupcake.jpg"
}

CUPCAKE_DATA_2 = {
    "flavor": "TestFlavor2",
    "size": "TestSize2",
    "rating": 10,
    "image": "http://test.com/cupcake2.jpg"
}

UPDATE_DATA = {
    "flavor": "UpdatedFlavor",
    "size": "UpdatedSize", 
    "rating": 8.5,
    "image": "http://test.com/updated-cupcake.jpg"
}


class CupcakeViewsTestCase(TestCase):
    """Tests for views of API."""

    def setUp(self):
        """Make demo data."""
        with app.app_context():
            Cupcake.query.delete()

            cupcake = Cupcake(**CUPCAKE_DATA)
            db.session.add(cupcake)
            db.session.commit()

            self.cupcake_id = cupcake.id

    def tearDown(self):
        """Clean up fouled transactions."""
        with app.app_context():
            db.session.rollback()

    def test_list_cupcakes(self):
        with app.app_context():
            with app.test_client() as client:
                resp = client.get("/api/cupcakes")

                self.assertEqual(resp.status_code, 200)

                data = resp.json
                self.assertEqual(data, {
                    "cupcakes": [
                        {
                            "id": self.cupcake_id,
                            "flavor": "TestFlavor",
                            "size": "TestSize",
                            "rating": 5,
                            "image": "http://test.com/cupcake.jpg"
                        }
                    ]
                })

    def test_get_cupcake(self):
        with app.app_context():
            with app.test_client() as client:
                url = f"/api/cupcakes/{self.cupcake_id}"
                resp = client.get(url)

                self.assertEqual(resp.status_code, 200)
                data = resp.json
                self.assertEqual(data, {
                    "cupcake": {
                        "id": self.cupcake_id,
                        "flavor": "TestFlavor",
                        "size": "TestSize",
                        "rating": 5,
                        "image": "http://test.com/cupcake.jpg"
                    }
                })

    def test_create_cupcake(self):
        with app.app_context():
            with app.test_client() as client:
                url = "/api/cupcakes"
                resp = client.post(url, json=CUPCAKE_DATA_2)

                self.assertEqual(resp.status_code, 201)

                data = resp.json

                # don't know what ID we'll get, make sure it's an int & normalize
                self.assertIsInstance(data['cupcake']['id'], int)
                del data['cupcake']['id']

                self.assertEqual(data, {
                    "cupcake": {
                        "flavor": "TestFlavor2",
                        "size": "TestSize2",
                        "rating": 10,
                        "image": "http://test.com/cupcake2.jpg"
                    }
                })

                self.assertEqual(Cupcake.query.count(), 2)

    def test_update_cupcake(self):
        with app.app_context():
            with app.test_client() as client:
                url = f"/api/cupcakes/{self.cupcake_id}"
                resp = client.patch(url, json=UPDATE_DATA)

                self.assertEqual(resp.status_code, 200)

                data = resp.json
                self.assertEqual(data, {
                    "cupcake": {
                        "id": self.cupcake_id,
                        "flavor": "UpdatedFlavor",
                        "size": "UpdatedSize",
                        "rating": 8.5,
                        "image": "http://test.com/updated-cupcake.jpg"
                    }
                })

    def test_delete_cupcake(self):
        with app.app_context():
            with app.test_client() as client:
                url = f"/api/cupcakes/{self.cupcake_id}"
                resp = client.delete(url)

                self.assertEqual(resp.status_code, 200)
                self.assertEqual(resp.json, {"message": "Deleted"})

                # Verify cupcake was actually deleted
                self.assertEqual(Cupcake.query.count(), 0)
