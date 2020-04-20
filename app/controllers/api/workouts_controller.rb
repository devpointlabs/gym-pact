class Api::WorkoutsController < ApplicationController
  before_action :authenticate_user!

  before_action :set_user, except: [:global_workouts, :global_users, :get_single_workout, :updateFollowing, :updateFollow]
  before_action :set_workout, only: [:show, :edit, :update, :destroy]

  def show
    # binding.pry
    # @workout = Workout.find(params[:id])
    render json: @workout
  end

  def get_single_workout
    @workout = Workout.find(params[:id])
    render json: @workout
  end

  def global_workouts
    render json: Workout.order("created_at DESC").all
  end

  def global_users
    render json: User.all
  end

  def index
    render json: current_user.workouts.order("created_at DESC")
  end

  def create
    @workout = current_user.workouts.new(workout_params)
      if @workout.save
        render json: @workout
      else 
        render json: {errors: @workout.errors}, status: :unprocessable_entity
      end
  end

  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: {errors: @workout.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    Workout.find(params[:id]).destroy
    render json: {message: 'Workout deleted'}
  end

# followers

  def updateFollower
    # adds current user as a follower to the user the current user chose to follow
    user = User.find(params[:id])
    user.update(followers: params[:followers])
    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  def updateFollowing
    # add current user as a following entry for viewed user
    user = User.find(params[:id])
    user.update(following: params[:following])
    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  private

  def workout_params
    params.require(:workout).permit(:title, :desc, :user_id)
  end

  def set_workout
    @workout = current_user.workouts.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end 

end
