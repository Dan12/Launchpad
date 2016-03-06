class AddSongNumber < ActiveRecord::Migration
  def change
    add_column :songs, :song_number, :integer
  end
end
