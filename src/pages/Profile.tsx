import ProfileForm from "../components/forms/ProfileForm"
import MainBase from "../components/layout/MainBase"

const ProfilePage = () => {
  return (
    <MainBase>
      <h1>Perfil</h1>

      <ProfileForm />
    </MainBase>
  )
}

export default ProfilePage