class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:update]


def show 
  @user = User.find(params[:id])
  render json: @user
end

def update
   @user = User.find(params[:id])
   if @user.update(user_params)
     render json: @user
   else
     render :edit    
   end
  end
#    file = params[:file]
#    if file
#     begin
#       ext = File.extname(file.tempfile)
#       #secret boolean value if it is secure or not, will not allow pass in if not secure
#       cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true) 
#       user.image = cloud.image['secure_url']
#     rescue => e 
#       render json: {errors: e }, status: 422

#     if user.save
#       render json: user
#     else
#       render json: { errors: user.errors.full_messages }, status: 422
#     end
# end

 private

 def set_user
   @user = User.find(params[:id])
 end

 def user_params
   params.require(:user).permit(:age, :weight, :gender, :username, :dateOfbirth, :followers, :following)
 end


end