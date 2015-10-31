Rails.application.routes.draw do
  root "application#index"
  
  post "/get_asset_path" => "application#getAssetUrl"
  
  #song
  post "/create_song" => "song#create"
  post "/load_song" => "song#load"
  post "/update_song" => "song#update"
end
