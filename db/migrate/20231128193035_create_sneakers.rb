class CreateSneakers < ActiveRecord::Migration[7.1]
  def change
    create_table :sneakers do |t|
      t.string :brand
      t.string :model
      t.string :size
      t.string :condition
      t.decimal :retail_price

      t.timestamps
    end
  end
end
