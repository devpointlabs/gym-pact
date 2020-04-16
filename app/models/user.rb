# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :workouts

  # has_many :follows 

  # has_many :follower_relationships, foreign_key: :following_id, class_name: 'Follow'
  # has_many :followers, through: :follower_relationships, source: :follower 

  # has_many :following_relationships, foreign_key: :user_id, class_name: 'Follow'
  # has_many :following, through: :following_relationships, source: :following 

end


