Rails.application.routes.draw do
  resources :reviews
  resources :sneakers do
    resources :reviews, only: [:index, :create]
  end
  resources :users

  get '/sneakers/:id', to: 'sneakers#custom_show', as: 'custom_sneaker_show'
  post '/login', to: 'sessions#login'
  post '/logout', to: 'sessions#logout'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "sneakers#index"
end
