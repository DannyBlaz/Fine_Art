class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :index]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @current_user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @current_user.update(user_params)
      render json: @current_user
    else
      render json: @current_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @current_user.destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :artist_type, :about, :password, :profile_picture)
    end
end
