import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo authUserId={props.authUserId}
                         profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         onUpdateUserPhoto={props.onUpdateUserPhoto}
                         submitUpdateProfile={props.submitUpdateProfile}
                         errorMessage={props.errorMessage}
                         isSubmittingSuccess={props.isSubmittingSuccess}
                         globalError={props.globalError}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;