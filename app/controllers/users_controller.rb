class UsersController < ApplicationController

  
  
end


def update
  @user = user.find(params[:id])
  if @user.update(user_params)
    redirect :home
  else
    render :edit
  end
end

private
def set_user
  @user = User.find(params[:id])
end
def user_params
  params.require(:user).permit(:age, :weight, :gender, :username, :dateOfbirth)
end