class Post < ApplicationRecord

  validates :title, :image, :category, :description, presence: true

  belongs_to :user
end
