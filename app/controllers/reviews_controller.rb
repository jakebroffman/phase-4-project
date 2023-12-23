class ReviewsController < ApplicationController
    before_action :set_review, only: [:show, :update, :destroy]

    def index
      reviews = Review.all
      render json: reviews
    end
  
    def show
        @review = Review.includes(:user).find(params[:id])
        render json: @review, include: :user
    end
  
    def create
      @review = @current_user.reviews.build(review_params)
      @review.sneaker_id = params[:sneaker_id]
    
      if @review.save
        render json: @review, status: :created
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
 
    def update
      if @review.update(review_params)
        render json: @review
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @review.destroy
      head :no_content
    end
  
    private
  
    def set_review
      @review = @current_user.reviews.find(params[:id])
    end
  
    def review_params
      params.require(:review).permit(:rating, :comment)
    end
  end
  