Rails.application.routes.draw do
  
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do 

    resources :users do
      resources :workouts
    end

    resources :workouts do 
      resources :comments
    end

    resources :users, only: :update
    
    get "/all_workouts", to: "workouts#global_workouts"
    get "/all_users", to: "workouts#global_users"
    get "/get_workout/:id", to: "workouts#get_single_workout"
    
    put "/user/:id", to: "workouts#updateFollower"
    put "/userf/:id", to: "workouts#updateFollowing"
    
    # get 'relationships/follow_user'
    # get 'relationships/unfollow_user'

    
  end
end
