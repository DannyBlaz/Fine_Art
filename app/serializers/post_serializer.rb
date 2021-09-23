class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :category, :description
  has_one :user
end
