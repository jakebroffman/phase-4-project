# Create users
user1 = User.create(username: 'john_doe', email: 'john@example.com', password: 'password123', profile_photo_url: 'https://example.com/john.jpg')
user2 = User.create(username: 'jane_smith', email: 'jane@example.com', password: 'securepass', profile_photo_url: 'https://example.com/jane.jpg')
user3 = User.create(username: 'bob_jackson', email: 'bob@example.com', password: 'letmein', profile_photo_url: 'https://example.com/bob.jpg')
user4 = User.create(username: 'alice_wonder', email: 'alice@example.com', password: 'wonderland', profile_photo_url: 'https://example.com/alice.jpg')
user5 = User.create(username: 'charlie_brown', email: 'charlie@example.com', password: 'peanuts', profile_photo_url: 'https://example.com/charlie.jpg')

# Create sneakers with retail prices and photo URLs
sneaker1 = Sneaker.create(brand: 'Nike', model: 'Air Jordan 1', size: '10', condition: 'New', retail_price: 170.0, photo_url: 'https://example.com/sneaker1.jpg')
sneaker2 = Sneaker.create(brand: 'Adidas', model: 'Yeezy Boost 350', size: '9.5', condition: 'New', retail_price: 220.0, photo_url: 'https://example.com/sneaker2.jpg')
sneaker3 = Sneaker.create(brand: 'Puma', model: 'Puma Suede Classic', size: '9', condition: 'New', retail_price: 60.0, photo_url: 'https://example.com/sneaker3.jpg')
sneaker4 = Sneaker.create(brand: 'Converse', model: 'Chuck Taylor All Star', size: '8', condition: 'New', retail_price: 55.0, photo_url: 'https://example.com/sneaker4.jpg')
sneaker5 = Sneaker.create(brand: 'Reebok', model: 'Classic Leather', size: '10.5', condition: 'New', retail_price: 80.0, photo_url: 'https://example.com/sneaker5.jpg')

# Create reviews
review1 = Review.create(user: user1, sneaker: sneaker1, rating: 4, comment: 'Great shoes!')
review2 = Review.create(user: user2, sneaker: sneaker2, rating: 5, comment: 'Amazing comfort and style!')
review3 = Review.create(user: user1, sneaker: sneaker2, rating: 4, comment: 'Love the design.')
review4 = Review.create(user: user3, sneaker: sneaker3, rating: 3, comment: 'Decent sneakers, good value for money.')
review5 = Review.create(user: user4, sneaker: sneaker4, rating: 5, comment: 'Classic and timeless.')
review6 = Review.create(user: user5, sneaker: sneaker5, rating: 4, comment: 'Comfortable for everyday wear.')
review7 = Review.create(user: user1, sneaker: sneaker3, rating: 3, comment: 'Not bad, but not my favorite.')
review8 = Review.create(user: user2, sneaker: sneaker4, rating: 4, comment: 'Love the versatility of these.')

puts 'Seed data created successfully.'
