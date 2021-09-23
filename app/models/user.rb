class User < ApplicationRecord
    
    has_secure_password

    validates :username, :artist_type, presence:true
    validates :password, presence: true, length: { minimum: 6, maximum: 16 }

end