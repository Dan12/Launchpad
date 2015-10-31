class SongController < ApplicationController
  
  def create
    s = Song.new
    s.song_data = params[:song_data]
    if s.save
      render :json => {"data" => s}
    else
      render :json => {"data" => "null"}
    end
  end
  
  def update
    
  end
  
  def load
    
  end
end