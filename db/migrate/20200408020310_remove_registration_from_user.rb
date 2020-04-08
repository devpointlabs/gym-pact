class RemoveRegistrationFromUser < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :registration, :string
  end
end
