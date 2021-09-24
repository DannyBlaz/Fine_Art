class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :category, :description
  belongs_to :user
  has_many :comments
end
