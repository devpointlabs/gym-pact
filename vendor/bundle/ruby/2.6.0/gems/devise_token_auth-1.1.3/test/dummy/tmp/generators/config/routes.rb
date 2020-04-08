            Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  mount_devise_token_auth_for 'Mang', at: 'mangs'
  as :mang do
    # Define routes for Mang within this block.
  end
              patch '/chong', to: 'bong#index'
            end
