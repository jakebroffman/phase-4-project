class Sneaker < ApplicationRecord
    belongs_to :user
    has_many :reviews
    has_many :users, through: :reviews
    
    validates :brand, presence: true
    validates :model, presence: true
    validates :size, presence: true
    validates :condition, presence: true
    validates :retail_price, numericality: { greater_than_or_equal_to: 0 }, allow_blank: true
    validates :photo_url, format: { with: URI::DEFAULT_PARSER.make_regexp, message: 'is not a valid URL' }, allow_blank: false
  end
  