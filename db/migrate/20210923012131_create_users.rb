class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :profile_picture
      t.string :username
      t.string :artist_type
      t.text :about
      t.string :password_digest

      t.timestamps
    end
  end
end
