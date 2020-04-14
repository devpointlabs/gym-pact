class Follow < ApplicationRecord

    belongs_to :folower, foreign_key: 'user_id', class_name: 'User'
    belongs_to :folower, foreign_key: 'following_id', class_name: 'User'
    
end
