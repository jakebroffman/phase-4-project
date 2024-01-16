class ApplicationController < ActionController::API
  include ActionController::Cookies
    before_action :authenticate_user
    
    def authenticate_user
      @current_user ||= User.find_by(id: session[:user_id])
      unless @current_user
         render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

  end
  
