class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  
  def update
    user = User.find(params[:id])
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.email = params[:email] ? params[:email] : user.email
    
    # file = params[:file]
    
    # if file
    #   begin
    #     ext = File.extname(file.tempfile)
    #     cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
    #     user.image = cloud_image['secure_url']
    #   # rescue => e
    #   #   render json: { errors: e }, status: 422
    #   end
    # end
    
    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end



 private

  def set_user
   @user = User.find(params[:id])
  end

  def user_params
  params.require(:user).permit(:first_name, :last_name, :age, :weight, :gender, :username, :date_of_birth, :fitness_level)
  end

end