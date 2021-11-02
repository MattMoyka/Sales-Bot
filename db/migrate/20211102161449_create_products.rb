class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :cost
      t.integer :profit
      t.string :description
      t.string :img
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
