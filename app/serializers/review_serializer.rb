class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user_id, :sneaker_id

  belongs_to :user
  belongs_to :sneaker
end
