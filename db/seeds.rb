
user1 = User.create(username: 'sneakerlover1', email: 'sneakerlover1@example.com', password: 'password1', profile_photo_url: 'https://example.com/profile1.jpg')
user2 = User.create(username: 'sneakerenthusiast2', email: 'sneakerenthusiast2@example.com', password: 'password2', profile_photo_url: 'https://example.com/profile2.jpg')
user3 = User.create(username: 'casualsneakerhead3', email: 'casualsneakerhead3@example.com', password: 'password3', profile_photo_url: 'https://example.com/profile3.jpg')


sneaker1 = Sneaker.create(brand: 'Nike', model: 'Air Jordan 1', size: '10', condition: 'New', retail_price: 170.0)
sneaker2 = Sneaker.create(brand: 'Adidas', model: 'Yeezy Boost 350', size: '9.5', condition: 'New', retail_price: 220.0)
sneaker3 = Sneaker.create(brand: 'Off-White', model: 'Off-White x Nike Air Max 90', size: '11', condition: 'New', retail_price: 160.0)
sneaker4 = Sneaker.create(brand: 'Puma', model: 'Puma Suede Classic', size: '9', condition: 'New', retail_price: 60.0)
sneaker5 = Sneaker.create(brand: 'New Balance', model: 'New Balance 990', size: '10.5', condition: 'New', retail_price: 175.0)


Review.create(user: user1, sneaker: sneaker1, rating: 5, comment: 'Amazing sneakers! Must-have for any collector.')
Review.create(user: user2, sneaker: sneaker1, rating: 4, comment: 'Love the colorway.')
Review.create(user: user1, sneaker: sneaker2, rating: 4, comment: 'Comfortable and stylish.')
Review.create(user: user2, sneaker: sneaker2, rating: 5, comment: 'Yeezy hype is real!')
Review.create(user: user1, sneaker: sneaker3, rating: 5, comment: 'Off-White quality is unmatched.')
Review.create(user: user2, sneaker: sneaker3, rating: 4, comment: 'Unique design and great materials.')
Review.create(user: user3, sneaker: sneaker4, rating: 4, comment: 'Classic style and comfortable.')
Review.create(user: user1, sneaker: sneaker4, rating: 3, comment: 'Decent sneakers for everyday wear.')
Review.create(user: user3, sneaker: sneaker5, rating: 5, comment: 'Quality materials and great comfort.')
Review.create(user: user2, sneaker: sneaker5, rating: 4, comment: 'Love the color options.')

puts 'Seed data created successfully.'

