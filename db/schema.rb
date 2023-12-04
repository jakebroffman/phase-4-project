# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_11_28_233141) do
  create_table "reviews", force: :cascade do |t|
    t.integer "user_id"
    t.integer "sneaker_id"
    t.integer "rating"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sneaker_id"], name: "index_reviews_on_sneaker_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "sneakers", force: :cascade do |t|
    t.string "brand"
    t.string "model"
    t.string "size"
    t.string "condition"
    t.decimal "retail_price"
    t.string "photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.string "profile_photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "reviews", "sneakers"
  add_foreign_key "reviews", "users"
end
