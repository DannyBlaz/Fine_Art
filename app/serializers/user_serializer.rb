class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :artist_type, :about, :password_digest
end
