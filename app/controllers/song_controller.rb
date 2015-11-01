class SongController < ApplicationController
  
  def create
    if session[:user_id] != nil
      @song = Song.find_by(id: params[:id])
      if @song
        @song.song_data = params[:song_data]
        @song.save
        render :json => {"data" => @song}
      else
        s = Song.new
        s.song_data = params[:song_data]
        s.name = params[:name]
        if s.save
          render :json => {"data" => s}
        else
          render :json => {"data" => "null"}
        end
      end
    else
      render :json => {"data" => "nli"}
    end
  end
  
  def view_all
    render :json => {"data" => Song.all}
  end
end