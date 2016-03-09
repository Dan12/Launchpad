class SongController < ApplicationController
  
  def create
    puts(params[:song_data])
    if session[:user_id] != nil
      @song = Song.find_by(id: params[:id])
      if @song
        @song.song_data = params[:song_data]
        @song.save
        render :json => {"data" => @song.id}
      else
        s = Song.new
        s.song_number = params[:songNum]
        s.song_data = params[:song_data]
        s.name = params[:name]
        if s.save
          render :json => {"data" => s.id}
        else
          render :json => {"data" => "null"}
        end
      end
    else
      render :json => {"data" => "nil"}
    end
  end
  
  def view_all
    render :json => {"data" => Song.where("cast(song_number as text) LIKE ?", "%#{params[:songNum]}%")}
  end
end