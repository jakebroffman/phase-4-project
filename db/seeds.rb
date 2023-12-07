# Create users
user1 = User.create(username: 'john_doe', email: 'john@example.com', password: 'password123', profile_photo_url: 'https://example.com/john.jpg')
user2 = User.create(username: 'jane_smith', email: 'jane@example.com', password: 'securepass', profile_photo_url: 'https://example.com/jane.jpg')
user3 = User.create(username: 'bob_jackson', email: 'bob@example.com', password: 'letmein', profile_photo_url: 'https://example.com/bob.jpg')
user4 = User.create(username: 'alice_wonder', email: 'alice@example.com', password: 'wonderland', profile_photo_url: 'https://example.com/alice.jpg')
user5 = User.create(username: 'charlie_brown', email: 'charlie@example.com', password: 'peanuts', profile_photo_url: 'https://example.com/charlie.jpg')

# Create sneakers with retail prices and photo URLs
sneaker1 = Sneaker.create(brand: 'Nike', model: 'Air Jordan 1', size: '10', condition: 'New', retail_price: 170.0, photo_url: 'https://poddleshop.com/wp-content/uploads/2023/10/poddleshop-27-scaled-poddleshop-Untitled-poddleshop.jpg')
sneaker2 = Sneaker.create(brand: 'Adidas', model: 'Yeezy Boost 350', size: '9.5', condition: 'New', retail_price: 220.0, photo_url: 'https://www.cottonnovas.com/cdn/shop/files/2790fb642878a83a5839f167686257fe.jpg?v=1692669435&width=1400')
sneaker3 = Sneaker.create(brand: 'Puma', model: 'Puma Suede Classic', size: '9', condition: 'New', retail_price: 60.0, photo_url: 'https://images.journeys.com/images/products/1_647848_ZM_THERO.JPG')
sneaker4 = Sneaker.create(brand: 'Converse', model: 'Chuck Taylor All Star', size: '8', condition: 'New', retail_price: 55.0, photo_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw6217c85c/images/a_107/3J231_A_107X1.jpg?sw=964')
sneaker5 = Sneaker.create(brand: 'Reebok', model: 'Classic Leather', size: '10.5', condition: 'New', retail_price: 80.0, photo_url: 'https://images.dsw.com/is/image/DSWShoes/523137_100_ss_01?impolicy=qlt-medium-high&imwidth=640&imdensity=2')

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
