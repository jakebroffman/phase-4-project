class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_photo_url
  has_many :reviews
end
