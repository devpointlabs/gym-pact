class Api::CommentsController < ApplicationController
   before_action :authenticate_user!
   before_action :set_workout, only: [:index]
   
   def index  
      render json: @workout.comments 
   end

   def create
      @comment = current_user.comments.new(comment_params)
      if @comment.save
         render json: @comment
      else
         render json: {errors: @comment.errors}, status: :unprocessable_entity
      end
   end

   private

   def set_workout
      @workout = Workout.find(params[:workout_id])
   end

   def comment_params
      params.require(:comment).permit(:text_field, :user_id, :workout_id)
   end
end
