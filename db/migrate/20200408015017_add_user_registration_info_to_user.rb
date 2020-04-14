class AddUserRegistrationInfoToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :username, :string
    add_column :users, :gender, :string
    add_column :users, :date_of_birth, :string
    add_column :users, :weight, :string
    add_column :users, :fitness_level, :string
  end
end
