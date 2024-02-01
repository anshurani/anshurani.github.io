class HomeController < ApplicationController
  include HomeHelper
  require "browser"

  #
  # GET /
  #
  def index
    @mobile = mobile_device?
  end

  def download
    send_file("#{Rails.root}/public/anshu_rani_resume.pdf", type: "application/pdf")
  end
end