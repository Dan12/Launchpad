class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def getAssetUrl
    render :json => {"asset_path" => ActionController::Base.helpers.asset_path("chain1/#{params["file_name"]}.mp3"), "sindex" => params["sindex"]}
  end
end
