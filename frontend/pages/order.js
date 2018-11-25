import PleaseSignin from "../components/PleaseSignin";
import Order from "../components/Order";

const OrderPage = props => {
  return (
    <div>
      <PleaseSignin>
        <p>This is a single Order!</p>
        <Order id={props.query.id} />
      </PleaseSignin>
    </div>
  );
};

export default OrderPage;
