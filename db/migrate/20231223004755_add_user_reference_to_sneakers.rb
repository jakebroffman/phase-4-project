class AddUserReferenceToSneakers < ActiveRecord::Migration[7.1]
  def change
    add_reference :sneakers, :user, null: false, foreign_key: true
  end
end
