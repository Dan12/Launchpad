class AddNameSong < ActiveRecord::Migration
  def change
    add_column :songs, :name, :string
  end
end
