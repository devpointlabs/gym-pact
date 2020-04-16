require 'test_helper'

class RelationshipsControllerTest < ActionDispatch::IntegrationTest
  test "should get follow_user" do
    get relationships_follow_user_url
    assert_response :success
  end

  test "should get unfollow_user" do
    get relationships_unfollow_user_url
    assert_response :success
  end

end
