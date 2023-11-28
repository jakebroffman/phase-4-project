class SneakerSerializer < ActiveModel::Serializer
  attributes :id, :brand, :model, :size, :condition, :retail_price, :photo_url

  has_many :reviews
end
