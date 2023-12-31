class SneakerSerializer < ActiveModel::Serializer
  attributes :id, :brand, :model, :size, :condition, :retail_price, :photo_url, :user_id

  has_many :reviews
end
