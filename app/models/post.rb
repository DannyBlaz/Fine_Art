class Post < ApplicationRecord

  validates :title, :image, :category, :description, presence: true
  validates :category, inclusion: { in: %w(Painting Sculpture Literature Architecture Photography Music Theater), message: "%{value} is not a valid category" }

  belongs_to :user
  has_many :comments
end
