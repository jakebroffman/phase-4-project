class User < ApplicationRecord
    has_many :reviews
    has_many :sneakers, through: :reviews
  
    validates :profile_photo_url, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'is not a valid URL' }, allow_blank: true
  end