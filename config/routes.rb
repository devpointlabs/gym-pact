Rails.application.routes.draw do
  get 'relationships/follow_user'
  get 'relationships/unfollow_user'
  mount_devise_token_auth_for 'User', at: 'api/auth'


  namespace :api do 
    resources :workouts
    resources :users, only: :update

    get "/all_workouts", to: "workouts#global_workouts"
    get "/all_users", to: "workouts#global_users"
  end
end
