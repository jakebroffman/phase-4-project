class Sneaker < ApplicationRecord
    has_many :reviews
  
    validates :retail_price, numericality: { greater_than_or_equal_to: 0 }, allow_blank: true
  end
  
