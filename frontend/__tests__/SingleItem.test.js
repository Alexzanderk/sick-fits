import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import SingleItem, { SINGLE_ITEM_QUERY } from "../components/SingleItem";
import { fakeItem } from "../lib/testUtils";

xdescribe("<SingleItem />", () => {
  it("renders with proper data", async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
        result: { data: { item: fakeItem() } }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain("Loading...");
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    expect(toJSON(wrapper.find("h2"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("img"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("p"))).toMatchSnapshot();
  });

  it('Errors with not found item', async () => {
      const mocks = [{
        request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
        result: { errors: [{message: 'Item not found'}]}
      }];

      const wrapper = mount(
        <MockedProvider mocks={mocks}>
          <SingleItem id="123" />
        </MockedProvider>
      );

      await wait();
      wrapper.update();
    //   console.log(wrapper.debug())
    const item = wrapper.find('[data-test="graphql-error"]');
    // console.log(item.debug());
    expect(item.text()).toContain('Item not found')
    expect(toJSON(item)).toMatchSnapshot();
  })
});
