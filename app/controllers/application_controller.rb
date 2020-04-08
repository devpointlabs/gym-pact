class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:dateOfBirth, :age, :username, :gender, :weight, :fitnesLevel  ])
      devise_parameter_sanitizer.for(:account_update, keys: [:dateOfBirth, :age, :username, :gender, :weight, :fitnessLevel  ])
    end
end
