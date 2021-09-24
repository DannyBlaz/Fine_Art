# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
p "seeding"

artist_type = %w(Painting Sculpture Literature Architecture Photography Music Theater)
category = %w(Painting Sculpture Literature Architecture Photography Music Theater)

u1 = User.create(username: "jack", about: Faker::Quote.famous_last_words, profile_picture:Faker::Avatar.image, password:"1234567", artist_type: artist_type.sample)
u2 = User.create(username: "jill", about: Faker::Quote.famous_last_words, profile_picture:"https://www.bt.com/content/dam/bt/portal/images/articles/tv/tv-kids-apple-onion-2.jpg", password:"1234567", artist_type: artist_type.sample)

p1 = Post.create(description: Faker::Quotes::Shakespeare.hamlet_quote, user_id: u1.id, category: category.sample, image:Faker::LoremFlickr.image( search_terms: ['art']), title: Faker::Movie.title)
p2 = Post.create(description: Faker::Quotes::Shakespeare.hamlet_quote, user_id: u2.id, category: category.sample, image:Faker::LoremFlickr.image( search_terms: ['art']), title: Faker::Movie.title)

c1 = Comment.create(body: Faker::Movie.quote, user_id: u1.id, post_id: p2.id)
c1 = Comment.create(body: Faker::Movie.quote, user_id: u2.id, post_id: p2.id)
c1 = Comment.create(body: Faker::Movie.quote, user_id: u1.id, post_id: p2.id)
c2 = Comment.create(body: Faker::Movie.quote, user_id: u2.id, post_id: p1.id)
c2 = Comment.create(body: Faker::Movie.quote, user_id: u1.id, post_id: p1.id)
c2 = Comment.create(body: Faker::Movie.quote, user_id: u2.id, post_id: p1.id)

p "done seeding"