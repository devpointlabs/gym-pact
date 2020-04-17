class Api::WorkoutsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, except: [:global_workouts, :global_users, :show]
  before_action :set_workout, only: [:show, :edit, :update, :destroy]

  def show
    @workout = Workout.find(params[:id])
    render json: @workout
  end

  def global_workouts
    render json: Workout.all
  end

  def global_users
    render json: User.all
  end

  def index
    render json: current_user.workouts
  end

  def create
    binding.pry
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

  private

  def workout_params
    params.require(:workout).permit(:title, :desc)
  end

  def set_workout
    @workout = current_user.workouts.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end 

end
