Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do 
<<<<<<< HEAD

    resources :users do
      resources :workouts
    end

    resources :workouts do 
      resources :comments
    end

    resources :users, only: :update
    
=======
>>>>>>> 02a5afaf3dd6446008a49b64cb9a803e7989d550
    get "/all_workouts", to: "workouts#global_workouts"
    get "/all_users", to: "workouts#global_users"
    resources :users do
      resources :workouts
      resources :users, only: :update
  end
<<<<<<< HEAD
end
=======
end
end
>>>>>>> 02a5afaf3dd6446008a49b64cb9a803e7989d550
