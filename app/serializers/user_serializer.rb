class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :artist_type, :about, :profile_picture, :password_digest
  has_many :posts
end
