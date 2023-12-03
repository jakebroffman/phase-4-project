class User < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :sneakers, through: :reviews

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true, length: { minimum: 6 }
    validates :profile_photo_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'is not a valid URL' }, allow_blank: true
  end