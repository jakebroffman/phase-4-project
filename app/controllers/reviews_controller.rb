class ReviewsController < ApplicationController
    before_action :set_sneaker
    before_action :set_review, only: [:show, :edit, :update, :destroy]
  
    def index
      @reviews = @sneaker.reviews
      render json: @reviews
    end
  
    def new
      @review = @sneaker.reviews.build
      render json: @review
    end
  
    def create
      @review = @sneaker.reviews.build(review_params)
      if @review.save
        render json: @review, status: :created
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_sneaker
      @sneaker = Sneaker.find(params[:sneaker_id])
    end
  
    def set_review
      @review = @sneaker.reviews.find(params[:id])
    end
  
    def review_params
      params.require(:review).permit(:user_id, :rating, :comment)
    end
  end
  