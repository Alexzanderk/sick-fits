import PleaseSignin from "../components/PleaseSignin";
import Permission from "../components/Permissions";

const PermissionsPage = props => {
  return (
    <div>
      <PleaseSignin>
        <Permission />
      </PleaseSignin>
    </div>
  );
};

export default PermissionsPage;
