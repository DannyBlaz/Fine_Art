class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :post_id
  belongs_to :user
  belongs_to :post

  # def comments_for_post
  #   byebug
  # end

end

