import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo ownProfile={props.ownProfile}
                         profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         onUpdateUserPhoto={props.onUpdateUserPhoto}
                         submitUpdateProfile={props.submitUpdateProfile}
                         errorMessage={props.errorMessage}
                         isSubmittingSuccess={props.isSubmittingSuccess}/>
            <MyPosts ownProfile={props.ownProfile}
                     posts={props.posts}
                     addPost={props.addPost}
                     photo={props.profile.photos.small}/>
        </div>
    )
}

export default Profile;