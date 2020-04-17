class Api::CommentsController < ApplicationController
   before_action :authenticate_user!
   before_action :set_workout, only: [:index, :destroy]
   before_action :set_comment, only: [:destroy]
   
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

   def destroy
      @comment.destroy
      if @comment.destroy
         render json: { message: "Commment Deleted"}
      else 
         render json: { message: "Commment Unable to Delete"}
      end
   end

   private

   def set_workout
      @workout = Workout.find(params[:workout_id])
   end

   def comment_params
      params.require(:comment).permit(:text_field, :user_id, :workout_id)
   end

   def set_comment 
      @comment = Comment.find(params[:id])
   end
end
