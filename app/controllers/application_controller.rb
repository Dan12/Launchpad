class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def getAssetUrl
    render :json => {"asset_path" => ActionController::Base.helpers.asset_path("chain#{params["chain"]}/#{params["file_name"]}.mp3"), "sindex" => params["sindex"]}
  end
  
  def index
    # session[:user_id] = nil
    render "index"
  end
  
  def logout
    session[:user_id] = nil
    redirect_to "/"
  end
  
  def login
    @user = User.find_by(username: params[:username])
    if @user and @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render :json => {"message" => "success"}
    else
      render :json => {"message" => "failed"}
    end
  end
  
  def google13ecc4458e525973
    render "google13ecc4458e525973", :layout => false
  end
end
