class UsersController < ApplicationController
    before_action :set_user, only: [ :update, :destroy]
  
    def show
        @user = User.find_by(id: session[:user_id])
        if @user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end
    end
  
  
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user.destroy
      head :no_content
    end
  
    private
  
    def set_user
      @user = User.find(id: session[:user_id])
    end
  
    def user_params
      params.require(:user).permit(:username, :email, :password, :profile_photo_url)
    end
  end
  