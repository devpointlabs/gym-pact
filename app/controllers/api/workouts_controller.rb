class Api::WorkoutsController < ApplicationController

  def show
    @workout = Workout.find(params[:id])
    render json: @workout
  end

  def index
    render json: Workout.all
  end

  def create
    @workout = Workout.new(workout_params)
      if @workout.save
        render json: @workout
      else 
        render json: {errors: @workout.errors}, status: :unprocessable_entitiy
      end
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: {errors: @workout.errors}, status: :unprocessable_entitiy
    end
  end
  
  def destroy
    Workout.find(params[:id]).destroy
    render json: {message: 'Workout deleted'}
  end

  private

  def workout_params
    params.require(:workout).permit(
      :title, :desc
    )
  end

end
