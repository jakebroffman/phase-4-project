class SneakersController < ApplicationController
    before_action :set_sneaker, only: [:show, :update, :destroy]
    before_action :authenticate_user!, only: [:destroy]

    def index
      @sneakers = Sneaker.all
      render json: @sneakers
    end
  
    def show
      render json: @sneaker
    end

    def create
      @sneaker = Sneaker.new(sneaker_params)
  
      if @sneaker.save
        render json: @sneaker, status: :created
      else
        render json: { errors: @sneaker.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if @sneaker.update(sneaker_params)
        render json: @sneaker
      else
        render json: { errors: @sneaker.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @sneaker.destroy
      head :no_content
    end
  
    private
  
    def set_sneaker
      @sneaker = Sneaker.find(params[:id])
    end
  
    def sneaker_params
      params.require(:sneaker).permit(:brand, :model, :size, :condition, :retail_price, :photo_url)
    end
  end
  
  