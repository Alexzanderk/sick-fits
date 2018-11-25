import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import PleaseSignin from "../components/PleaseSignin";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
];

xdescribe("<PleaseSignin />", () => {
  it("renders the sign in  dialog to logged out user", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignin />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    expect(wrapper.text()).toContain("Please Sign In!");
    expect(wrapper.find("Signin").exists()).toBe(true);
  });

  it("renders the child component when the user is sign in", async () => {
    const Hey = () => <p>Hey!</p>;

    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignin>
          <Hey />
        </PleaseSignin>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    // expect(wrapper.find("Hey").exists()).toBe(true);
    expect(wrapper.contains(<Hey />)).toBe(true);
  });
});
