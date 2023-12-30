class SneakersController < ApplicationController
  before_action :set_sneaker, only: [:show, :update, :destroy, :custom_show]
  before_action :authenticate_user!, only: [:destroy]

  def index
    @sneakers = Sneaker.all
    render json: @sneakers
  end

  def show
    render_sneaker_with_reviews
  end

  def custom_show
    render_sneaker_with_reviews
  end

  def create
    @sneaker = current_user.sneakers.build(sneaker_params)

    if save_and_render_response(@sneaker)
      render json: @sneaker, status: :created
    end
  end

  def update
    if save_and_render_response(@sneaker)
      render json: @sneaker
    end
  end

  def destroy
    @sneaker.destroy
    @sneaker.reviews.destroy_all
    head :no_content
  end

  private

  def set_sneaker
    @sneaker = Sneaker.find(params[:id])
  end

  def sneaker_params
    params.require(:sneaker).permit(:brand, :model, :size, :condition, :retail_price, :photo_url, :user_id)
  end

  def render_sneaker_with_reviews
    @sneaker = Sneaker.includes(reviews: :user).find(params[:id])
    render json: @sneaker, include: { reviews: { include: :user } }
  end

  def save_and_render_response(sneaker)
    if sneaker.save
      true
    else
      render json: { errors: sneaker.errors.full_messages }, status: :unprocessable_entity
      false
    end
  end
end
