Rails.application.routes.draw do
  root "application#index"
  
  post "/get_asset_path" => "application#getAssetUrl"
  
  post "/login" => "application#login"
  get "/logout" => "application#logout"
  
  #song
  post "/create_song" => "song#create"
  post "/view_all_songs" => "song#view_all"
  
  get "/google13ecc4458e525973" => "application#google13ecc4458e525973"
end
