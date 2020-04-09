Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :workouts
    get "/all_workouts", to: "workouts#global_workouts"
  end
end
