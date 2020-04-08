class AddStuffToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :dateOfBirth, :string
    add_column :users, :username, :string
    add_column :users, :gender, :string
    add_column :users, :weight, :integer
    add_column :users, :age, :integer
    add_column :users, :fitnessLevel, :string
  end
end
