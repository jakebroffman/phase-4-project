class User < ApplicationRecord
  has_secure_password
  has_many :reviews
  has_many :sneakers
  has_many :sneakers, through: :reviews

  validates :username, presence: true, uniqueness: { scope: :id, message: "Username is already taken" }, on: :create
  validates :email, presence: true, uniqueness: { scope: :id, message: "Email is already taken" }, format: { with: URI::MailTo::EMAIL_REGEXP }, on: :create
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :profile_photo_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'is not a valid URL' }, allow_blank: true
end
