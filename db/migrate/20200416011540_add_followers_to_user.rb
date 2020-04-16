class AddFollowersToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :followers, :integer, array: true, default: []
    add_column :users, :following, :integer, array: true, default: []
  end
end

  